import axios from 'axios'
import * as PDFJS from 'pdfjs-dist'
import { getToken } from '../utils';
import { API_KEY, API_HOST } from '../config';

import { CreateDocumentAction } from 'redux/actions';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const getTotalNumberOfPages = async (file) => {
  // const uploadedFileuri = getFileURL(file)
  console.log('Here I am.. 3')

  return await PDFJS.getDocument(file).promise.then(pdf => pdf.numPages)
}

const pdfTob64 = async (page) => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "pdfTob64canv");
  let canv = document.querySelector("#pdfTob64canv");

  var viewport = page.getViewport({ scale: 1.5 });
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  var render_context = {
    canvasContext: canvas.getContext("2d"),
    viewport: viewport,
  };

  await page.render(render_context).promise;
  return canvas.toDataURL("image/png");
}

const googleCloud = {
  apiKey: API_KEY,
  api: "https://vision.googleapis.com/v1/images:annotate?key="
};

const callGoogleVIsionApi = async (base64) => {
  let url = googleCloud.api + googleCloud.apiKey;
  try {
    let visionData = await axios.post(url, {
      requests: [
        {
          image: {
            content: base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
          },
          features: [
            { type: "TEXT_DETECTION", maxResults: 5 },
          ]
        }
      ]
    })
    return visionData.data.responses[0].fullTextAnnotation.text
  } catch (error) {
    return error
  }

}

const getPDFContent = async (file, current, last) => {
  console.log(file, current, last);

  const pdf = await PDFJS.getDocument(file).promise
  let collection = []
  for (let i = current; i < last; i++) {
    const page = await pdf.getPage(i)
    let pageText = await page.getTextContent()
    const imageBase64 = await pdfTob64(page)
    if (pageText !== null) pageText = pageText.items.map(s => s.str).join(' ')
    collection.push({ pageText, imageBase64 })
  }
  return collection
}

export const createJobDetail = async (fileURL, jobID, package_type) => {
  console.log({ fileURL, jobID, package_type });
  /**
     * get file url
     * get total page number
     * get pdf document
     * start per page loop
     * 
     */

  console.log('Here I am..')

  const pdfLength = await getTotalNumberOfPages(fileURL)
  console.log('Here I am..1')

  const pdf = await PDFJS.getDocument(fileURL).promise
  console.log('Here I am..2')

  // start The Loop for creation of job detail 
  let finalItteration = 1;
  for (let i = 0; i <= pdfLength; i++) {

    if (finalItteration > i) {
      continue
    }
    // if (i > 193) {
    //   break
    // }
    let content = null;
    // let finalContent = null;
    const page = await pdf.getPage(i)
    const textcontent = await page.getTextContent()
    const img = await pdfTob64(page)

    // console.log("page====", page);
    // console.log("text=====",textcontent.items);
    // console.log("text length=====",textcontent.items.length);
    // console.log("img====", img);
    if (textcontent.items.length === 0) {

      content = await callGoogleVIsionApi(img)


      // content = sampleOCRText
      // const {data} = await sendOCR({image: img})
      // console.log('data', data)
      // img.replace(/^data:image\/\w+;base64,/, "")
      // console.log('img', img)
      // content = await tesseractOCR(img)
    } else {

      // content = textcontent.items.map(s => s.str).join('')
      content = textcontent.items.map((s) => {
        // if (i===18){console.log(s.str)}
        return s.str
      }).join(' ')
    }

    // const regex = /(?:1\s?of\s?\d+)|(?:1\s?0f\s?\d+)/g;
    const regex = /(?:1\s?of\s?\d+)/g;
    const pageExist = content?.match(regex)
    // console.log(pageExist);
    let finalPage = null
    let collection = null
    if (pageExist !== null && pageExist !== undefined) {
      const reg = /\d+/g;
      const regOutPut = pageExist.toString().match(reg)

      // const regOutPut = parseInt(pageExist.toString().match(reg))
      if (regOutPut.length === 2) {
        finalPage = regOutPut[1]
      }
      // console.log(finalPage);
      //     if (finalPage > 1) {
      collection = await getPDFContent(fileURL, i, +finalPage + i)
      // }
    }

    finalItteration = +finalPage + i

    // API call
    const localToken = await getToken()
    // console.log('localToken', localToken)
    // if (localToken !== null) {
    //     const token = JSON.parse(localToken || "")
    //     if (token) {
    //         // console.log('token.length>1', token.length > 1)
    //         headers.set('Authorization', `Bearer ${token}`)
    //     }
    // }
    const config = {
      'Content-Type': 'application/json',
      'Authorization': localToken
    }
    if (finalPage === null) {
      const res = await axios.post(API_HOST + '/single_jobdetail/', {
        pageText: content,
        imageBase64: img,
        page_found: false,
        job_id: jobID,
        package_type: package_type
      }, { headers: config })
    } else {
      const res = await axios.post(API_HOST + '/single_jobdetail/', {
        data: collection,
        page_found: true,
        job_id: jobID,
        package_type: package_type
      }, { headers: config })

    }

    // if (lenderPdfLength === i) {
    //     await setCreatedJobID(data.id)
    //     console.log('skip changed')
    // }

  }
  const localToken = await getToken()

  const config = {
    'Content-Type': 'application/json',
    'Authorization': localToken
  }
  const res = await axios.get(API_HOST + '/job/' + jobID + '/documents/', {
    headers: config
  })
  return 'ok'

}

export const updateJobDetail = async (fileURL, jobID, package_type, docType) => {
  console.log({ fileURL, jobID, docType, package_type });
  /**
     * get file url
     * get total page number
     * get pdf document
     * start per page loop
     * 
     */

  let images = []
  // API call
  const localToken = await getToken()
  const config = {
    'Content-Type': 'application/json',
    'Authorization': localToken
  }
  console.log('Here I am..')

  const pdfLength = await getTotalNumberOfPages(fileURL)
  console.log('Here I am..1')

  const pdf = await PDFJS.getDocument(fileURL).promise
  console.log('Here I am..2')

  // start The Loop for creation of job detail 
  let finalItteration = 1;
  for (let i = 0; i <= pdfLength; i++) {

    if (finalItteration > i) {
      continue
    }
    // if (i > 193) {
    //   break
    // }
    let content = null;
    // let finalContent = null;
    const page = await pdf.getPage(i)
    const textcontent = await page.getTextContent()
    const img = await pdfTob64(page)

    // console.log("page====", page);
    // console.log("text=====",textcontent.items);
    // console.log("text length=====",textcontent.items.length);
    // console.log("img====", img);
    if (textcontent.items.length === 0) {

      content = await callGoogleVIsionApi(img)


      // content = sampleOCRText
      // const {data} = await sendOCR({image: img})
      // console.log('data', data)
      // img.replace(/^data:image\/\w+;base64,/, "")
      // console.log('img', img)
      // content = await tesseractOCR(img)
    } else {

      // content = textcontent.items.map(s => s.str).join('')
      content = textcontent.items.map((s) => {
        // if (i===18){console.log(s.str)}
        return s.str
      }).join(' ')
    }

    // const regex = /(?:1\s?of\s?\d+)|(?:1\s?0f\s?\d+)/g;
    const regex = /(?:1\s?of\s?\d+)/g;
    const pageExist = content?.match(regex)
    // console.log(pageExist);
    let finalPage = null
    let collection = null
    if (pageExist !== null && pageExist !== undefined) {
      const reg = /\d+/g;
      const regOutPut = pageExist.toString().match(reg)

      // const regOutPut = parseInt(pageExist.toString().match(reg))
      if (regOutPut.length === 2) {
        finalPage = regOutPut[1]
      }
      // console.log(finalPage);
      //     if (finalPage > 1) {
      collection = await getPDFContent(fileURL, i, +finalPage + i)
      // }
    }

    finalItteration = +finalPage + i


    images.push({
      page_text: content,
      image_base_64: img,
    })


    // if (lenderPdfLength === i) {
    //     await setCreatedJobID(data.id)
    //     console.log('skip changed')
    // }

  }
  console.log({ images })
  const payload = {
    images,
    document_type_id: docType,
    package_type: 1
  }
  console.log({ payload })
  const res = await axios.post(API_HOST + '/job/' + jobID + '/extra_documents/', payload, { headers: config })

  // if (finalPage === null) {
  //   const res = await axios.post(API_HOST + '/single_jobdetail/', {
  //     pageText: content,
  //     imageBase64: img,
  //     page_found: false,
  //     job_id: jobID,
  //     package_type: package_type
  //   }, { headers: config })
  // } else {
  //   const res = await axios.post(API_HOST + '/single_jobdetail/', {
  //     data: collection,
  //     page_found: true,
  //     job_id: jobID,
  //     package_type: package_type
  //   }, { headers: config })

  // }
  // const localToken = await getToken()

  // const config = {
  //   'Content-Type': 'application/json',
  //   'Authorization': localToken
  // }
  // const res = await axios.get(API_HOST + '/job/' + jobID + '/documents/', {
  //   headers: config
  // })
  return 'ok'

}