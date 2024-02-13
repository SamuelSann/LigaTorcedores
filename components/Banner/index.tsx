import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

export const Banner = () => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
            delay: 1000,
            disableOnInteraction: false
        }}
        modules={[Autoplay]}
        className={styles.swiper}
      >
        <SwiperSlide className={styles.slide}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.slide}>Slide 2</SwiperSlide>
      </Swiper>
    </div>
  );
};
