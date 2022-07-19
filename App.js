import React, {useEffect, useRef, useState} from 'react';
import { registerVevComponent, useSize } from '@vev/react';
import FsLightbox from 'fslightbox-react';
import "./styles.css";

//Definer lightbox som default funksjon, bruk elementref og usesize for å hente størrelsen på elementet.
const Lightbox = (props) => {
  const elementReference = useRef(null);
  const [ cover, setCover ]  = useState("https://cdn.vev.design/cdn-cgi/image/f=auto,q=82/private/eZnxAcdFstddxKYGM8AXAUiPaAo2/image/_W5nWypsaj.png");
  const { width, height } = useSize(props.hostRef);
  const [key , setKey ] = useState(0);
  //Toggler er for fslightbox og imgList er listen over urler til bilder
  const [toggler, setToggler] = useState(false);
  const [imgList, setImglist] = useState([]);
  const [visible, setVisible] = useState(true);
  //Hver settings endres, tøm imglist og fyll den med det som er i Images
  useEffect(() => {
    if (typeof props.Images !== 'undefined') {
      let tempList = []
      var i = 0
      for (var i = 0; (i <= (props.Images.length - 1 )); i++) {
                tempList.push(props.Images[i].image.url)
      }
      setKey(i)
      setImglist(tempList)

      if (props.Images.length === 0){
        setCover("https://cdn.vev.design/cdn-cgi/image/f=auto,q=82/private/eZnxAcdFstddxKYGM8AXAUiPaAo2/image/_W5nWypsaj.png")
      } else {
      setCover(imgList[(props.coverIndex -1 )])
      }
    }
  }, [props?.Images?.length, cover, props.coverIndex])
  
  useEffect(() => {
    if (typeof props.showCover !== 'undefined'){
     setVisible(props.showCover)
    } else {
     setVisible(props.showCover)
    }
   
  }, [props.showCover])

  useEffect(() => {
     setVisible(true)
  }, [])

  return ( 
  <>
  <div>

    <img src={cover} style={{opacity: (visible ? 1 : 0)}} alt="Load an image" width={ width } height={ height } onClick={() => setToggler(!toggler)}/>
  
  
  <FsLightbox
  toggler={toggler}
  sources={imgList}
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
