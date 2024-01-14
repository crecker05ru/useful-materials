"use client";
import Image from "next/image";
import styles from "./page.module.css";
import mockData from "../api/mockData";
import {
  DragEventHandler,
  DragEvent,
  TouchEventHandler,
  useRef,
  useState,
  useMemo,
} from "react";

export default function Home() {
  const sliderViewElement = useRef(null);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [sliderChilds, setSliderChilds] = useState<HTMLCollection | null>(null);
  const imageStyleMap: {
    [key: string]: string;
  } = {
    types__1: "image_type__sharp-leaf-left",
    types__2: "image_type__sharp-leaf-right",
    types__3: "image_type__obtuse-leaf-left",
    types__4: "image_type__obtuse-leaf-right",
    types__5: "image_type__circle",
    "types__two-block": "image_type__two-block",
  };
  const sliderItemsElement = useMemo(() => {
    if (sliderViewElement.current) {
      // (sliderViewElement.current as HTMLElement).scrollLeft = 0;
      const childs = (sliderViewElement.current as HTMLElement).children;
      const currentChild = childs[currentSlideIndex];
      setSliderChilds(childs);
      const previousChild = childs[currentSlideIndex - 1];
      const nextChild = childs[currentSlideIndex + 1];

      const currentChildWidth = currentChild?.clientWidth;
      console.log("currentChildWidth", currentChildWidth);
      console.log("childs", childs);
      return childs;
    }
  }, [sliderViewElement, currentSlideIndex]);

  const clickSliderLeft = () => {
    if (sliderViewElement.current) {
      // (sliderViewElement.current as HTMLElement).scrollLeft = 0;
      // (sliderViewElement.current as HTMLElement).scrollBy(-300,0);
      if (currentSlideIndex > 0) {
        setCurrentSlideIndex(currentSlideIndex - 1);
        if (sliderChilds) {
          (sliderViewElement.current as HTMLElement).scrollBy(
            -sliderChilds[currentSlideIndex].clientWidth,
            0
          );
        }
      }

      console.log(sliderViewElement.current);
    }
  };
  const clickSliderRight = () => {
    if (sliderViewElement.current) {
      // (sliderViewElement.current as HTMLElement).scrollLeft = (sliderViewElement.current as HTMLElement).scrollWidth;
      if (currentSlideIndex < mockData.length - 1) {
        console.log("currentSlideIndex", currentSlideIndex);
        setCurrentSlideIndex(currentSlideIndex + 1);
        //  (sliderViewElement?.current as HTMLElement).scrollBy(300,0);
        if (sliderChilds) {
          (sliderViewElement.current as HTMLElement).scrollBy(
            sliderChilds[currentSlideIndex].clientWidth,
            0
          );
        }
      }
      console.log(sliderViewElement?.current);
    }
  };
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    // const touchEvent = e as  TouchEventHandler<HTMLDivElement>
    // const dragEvent = e as DragEventHandler<HTMLDivElement>
    console.log("e", e.clientX);
    setDragStart(e.clientX);
    console.log("e", e.clientX);
  };
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    // const touchEvent = e as  TouchEventHandler<HTMLDivElement>
    // const dragEvent = e as DragEventHandler<HTMLDivElement>

    if (sliderViewElement.current) {
      // (sliderViewElement.current as HTMLElement).scrollLeft = 0;
      (sliderViewElement.current as HTMLElement).scrollTo(e.clientX, 0);
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.mainInner}>
        <div className={styles.mainHead}>
          <h1 className={styles.mainTitle}>Полезные материалы</h1>
          <p className={styles.mainText}>
            Собрали для вас полезные исследования схемы кормления и другие
            материалы, которые пригодятся для лучших результатов на вашем
            хозяйстве
          </p>
        </div>
        <div className={styles.slider}>
          <div
            className={styles.sliderView}
            ref={sliderViewElement}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {mockData &&
              mockData.map((item) => {
                return (
                  <div key={item.id} className={styles.sliderItem}>
                    <div className={styles.sliderItemContent}>
                      {item.title.length < 35 ? (
                        <img
                          alt="Image"
                          src={item.img}
                          className={
                            styles.sliderItemImage +
                            " " +
                            `${imageStyleMap[item.types]}`
                          }
                        />
                      ) : (
                        <img
                          alt="Image"
                          src={item.img}
                          className={
                            styles.sliderDoubleItemImage +
                            " " +
                            `${imageStyleMap[item.types]}`
                          }
                        />
                      )}
                      <h4 className={styles.sliderItemTitle}>{item.title}</h4>
                      <p className={styles.sliderItemText}>
                        {String(item.date)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.sliderButtons}>
            <button
              onClick={clickSliderLeft}
              className={
                styles.sliderButtonLeft +
                " " +
                `${currentSlideIndex > 0 ? "" : "slider-button__disabled"}`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="173"
                height="23"
                viewBox="0 0 173 23"
                fill="none"
              >
                <rect
                  x="1"
                  y="10"
                  width="172"
                  height="2.99998"
                  fill="#7884A5"
                />
                <path
                  d="M12 0V0C12 6.07513 7.07513 11 0.999998 11L-9.69627e-07 11"
                  stroke="#7884A5"
                  strokeWidth="3"
                />
                <path
                  d="M12 23V23C12 16.9249 7.07513 12 1 12L6.11999e-07 12"
                  stroke="#7884A5"
                  strokeWidth="3"
                />
              </svg>
            </button>
            <button
              onClick={clickSliderRight}
              className={
                styles.sliderButtonRight +
                " " +
                `${
                  currentSlideIndex < mockData.length - 1
                    ? ""
                    : "slider-button__disabled"
                }`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="173"
                height="23"
                viewBox="0 0 173 23"
                fill="none"
              >
                <rect
                  width="172"
                  height="2.99998"
                  transform="matrix(-1 8.74228e-08 8.74228e-08 1 172 10)"
                  fill="#7884A5"
                />
                <path
                  d="M161 0V0C161 6.07513 165.925 11 172 11L173 11"
                  stroke="#7884A5"
                  strokeWidth="3"
                />
                <path
                  d="M161 23V23C161 16.9249 165.925 12 172 12L173 12"
                  stroke="#7884A5"
                  strokeWidth="3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
