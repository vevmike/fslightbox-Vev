import React, { useEffect, useRef, useState, } from 'react';
import { registerVevComponent, useSize, useEditorState } from '@vev/react';
import FsLightbox from 'fslightbox-react';
import "./styles.css";

type Props = {
  title: Images,
  title: showCover,
  title: coverIndex,
};

const Lightbox = ({ showCover = true, Images, coverIndex = 1 }: Props) => {
  const cover = "https://cdn.vev.design/cdn-cgi/image/f=auto,q=82/private/eZnxAcdFstddxKYGM8AXAUiPaAo2/image/_W5nWypsaj.png";
  const [key, setKey] = useState(0);
  const [toggler, setToggler] = useState(false);
  const [imgList, setImglist] = useState([]);
  const [visible, setVisible] = useState(true);
  const [defaultCoveron, setDefaultcoveron] = useState(true);
  const [coverURL, setCoverurl] = useState("https://cdn.vev.design/cdn-cgi/image/f=auto,q=82/private/eZnxAcdFstddxKYGM8AXAUiPaAo2/image/_W5nWypsaj.png");
  const { disabled } = useEditorState();

  useEffect(() => {
    var a = 0
    if (typeof Images !== 'undefined') {
      let tempList = []
      if (Images.length > 0) {
        for (var i = 0; (i <= (Images.length - 1)); i++) {
          tempList.push(Images[i].image?.url)
        }
        setImglist(tempList)
        setDefaultcoveron(false)
        setCoverurl(tempList[(coverIndex - 1)])
      } else {
        setDefaultcoveron(true)
      }
    }
    setKey(a)
    console.log("Images length change")
  }, [Images?.length, defaultCoveron])

  useEffect(() => {
    if (imgList.length > 0) {
      setCoverurl(imgList[(coverIndex - 1)])
      setDefaultcoveron(false)
    }
    console.log("coverindex change")
  }, [coverIndex])

  useEffect(() => {
    setVisible(showCover)
    console.log("visible", showCover)
  }, [showCover])

  return (
    <>
      <div className='wrapper'>
        <img src={defaultCoveron ? cover : coverURL} style={{ opacity: (visible ? 1 : 0) }} alt="Load an image" onClick={() => setToggler(!toggler)} />

        <FsLightbox
          toggler={toggler}
          sources={defaultCoveron ? [cover] : imgList}
          thumbs={imgList}
          key={key}
          slide={1} /></div>
    </>
  )
};

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
