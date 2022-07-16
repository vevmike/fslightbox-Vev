import React, {useEffect, useRef, useState} from 'react';
import { registerVevComponent, useSize } from '@vev/react';
import FsLightbox from 'fslightbox-react';

//Definer lightbox som default funksjon, bruk elementref og usesize for å hente størrelsen på elementet.
const Lightbox = (props) => {
  const elementReference = useRef(null);
  const { width, height } = useSize(props.hostRef);
  const [key , setKey ] = useState(0);

  //Toggler er for fslightbox og imgList er listen over urler til bilder
  const [toggler, setToggler] = useState(false);
  const [imgList, setImglist] = useState(null);
  const [listLenght, setListLenght] = useState()

//Hver gang props endres, tøm imglist og fyll den med det som er i Images
  useEffect(() => {
    let tempList = []
    var i = 0
    for (var i = 0; (i <= (props.Images.length - 1 )); i++) {
              tempList.push(props.Images[i].image.url)

    }
    setKey(i)
    setImglist(tempList)
    console.log("nå kjørte useEffect", props, props.Images[0].image)
  }, [props.Images.length])




  return ( 
  <>
  <div>
<img src={props.Images[0].image.url} alt="Load an image" width={ width } height={ height } onClick={() => setToggler(!toggler)} />


<FsLightbox
toggler={toggler}
sources={imgList}
thumbs={imgList}
key={props.Images.length}
slide={1}

/></div>
</>


)};


registerVevComponent(Lightbox, {
  name: "fslightbox-Vev",
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
  ],
});

export default Lightbox;
