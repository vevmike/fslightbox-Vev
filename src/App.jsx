import React, {useEffect, useRef, useState, } from 'react';
import { registerVevComponent, useSize, useEditorState } from '@vev/react';
import FsLightbox from 'fslightbox-react';
import "./styles.css";


//Define the default function. Cover is the image loaded when no images has been loaded.


const Lightbox = (props) => {

  const cover = "https://cdn.vev.design/cdn-cgi/image/f=auto,q=82/private/eZnxAcdFstddxKYGM8AXAUiPaAo2/image/_W5nWypsaj.png";
  const [ key,setKey ] = useState(0);
  const [ toggler,setToggler ] = useState(false);
  const [ imgList,setImglist ] = useState([]);
  const [ visible,setVisible ] = useState(true);
  const [ defaultCoveron,setDefaultcoveron ] = useState(true);
  const [ coverURL,setCoverurl ] = useState("");
  const { disabled } = useEditorState();
 
  useEffect(() => {
    var a = 0
    if (typeof props.Images !== 'undefined') {
      console.log("not undefined", props)
      let tempList = []
      if (props.Images.length > 0){
        console.log("not zero", props, coverURL, defaultCoveron)
        
        for (var i = 0; (i <= (props.Images.length - 1 )); i++) {
                  tempList.push(props.Images[i].image?.url)
        }
      setImglist(tempList)
      setDefaultcoveron(false)
      setCoverurl(tempList[(props.coverIndex- 1)])
        } else {
          setDefaultcoveron(true)
        }
    }
  setKey(a)
  console.log("Images length change", props, coverURL, defaultCoveron)
  }, [props.Images?.length, defaultCoveron])

  useEffect(() => {
    if (imgList.length > 0){
      setCoverurl(imgList[(props.coverIndex- 1)])
      console.log("coverindex change", coverURL)
      setDefaultcoveron(false)
    }
  },[props.coverIndex])

  useEffect(() => {
    setVisible(props.showCover)
  },[props.showCover])

  return (   
  <>
  <div className='wrapper'>
    <img src={defaultCoveron ? cover : coverURL } style={{opacity: (visible ? 1 : 0)}} alt="Load an image" onClick={() => setToggler(!toggler)}/>
    
  <FsLightbox
  toggler={toggler}
  sources={defaultCoveron ? [cover] : coverURL}
  thumbs={imgList}
  key={key}
  slide={1}/></div>
  </>
)};

registerVevComponent(Lightbox, {
  name: "fslightbox-Vev3",
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
        title: "Index of cover img:",
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
