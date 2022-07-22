import React, {useEffect, useRef, useState} from 'react';
import { registerVevComponent, useSize } from '@vev/react';
import FsLightbox from 'fslightbox-react';
import "./styles.css";


//Define the default function. Cover is the image loaded when no images has been loaded.


const Lightbox = (props) => {

  const cover = "https://cdn.vev.design/cdn-cgi/image/f=auto,q=82/private/eZnxAcdFstddxKYGM8AXAUiPaAo2/image/_W5nWypsaj.png";
  const [ key , setKey ] = useState(0);
  const [ toggler, setToggler ] = useState(false);
  const [ imgList, setImglist ] = useState([]);
  const [ visible, setVisible ] = useState(true);
  const [ defaultCoveron, setDefaultcoveron ] = useState(true);
  const [ coverURL,setCoverurl ] = useState([]);



// If the Images arrays length, the coverImg URL or the indexnumber setting the preferred coverimage cahnges, check if array is not undefined, then iterate through the image-url's and add them to templist.
// fsLightbox only updates props if key is set, so we set a new key for each image added. If the list is empty, set defaultCoveron to true. 
  useEffect(() => {
    if (typeof props.Images !== 'undefined') {
      let tempList = []
      for (var i = 0; (i <= (props.Images.length - 1 )); i++) {
                tempList.push(props.Images[i].image.url)
      }
      setKey(i)
      setImglist(tempList)
      setCoverurl(imgList[(props.coverIndex -1 )])

      if (props.Images.length === 0){
        setDefaultcoveron(true)
      } else {
        setDefaultcoveron(false)
      }
    }
  }, [props?.Images?.length, coverURL, props.coverIndex])
  

  //Sets visible to true or false based on showCover toggle button
  useEffect(() => {
    if (typeof props.showCover !== 'undefined'){
     setVisible(props.showCover)
    } else {
     setVisible(true)
    }
  }, [props.showCover, visible])


// This runs first, and triggers the above useEffect
  useEffect(() => {  
     setVisible(true)
  }, [])

// defaultCoveron state sets wether image is default cover or the imglist.

  return ( 
  <>
  <div className='wrapper'>
    <img src={defaultCoveron ? cover : coverURL} style={{opacity: (visible ? 1 : 0)}} alt="Load an image" onClick={() => setToggler(!toggler)}/>
    
  <FsLightbox
  toggler={toggler}
  sources={defaultCoveron ? [cover] : imgList}
  thumbs={imgList}
  key={key}
  slide={1}/></div>
  </>

)};

registerVevComponent(Lightbox, {
  name: "fslightbox-Vev2",
  props: [
    {
      name: "Images",
      type: "array",
      of: [
        {
          name: "image",
          type: "image",
        },
      ],
      
    },
    {
        name: "coverIndex",
        type: "number",
        title: "Index of cover img (One-based indices):",
        initialValue: 1,

    },
    {
        name: "showCover",
        type: "boolean",
        title: "Show cover image",
        initialValue: true,
    },
  ],
});

export default Lightbox;
