import React, {useEffect} from 'react';
import { fetchPromoProducts } from '../../store/api-action/promo-products-api';
import Banner from '../../components/banner/banner';
import styles from './swiper-slide.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import { useAppDispatch, useAppSelector } from '../hook';

function SwiperSlides(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const promoProducts = useAppSelector((state) => state.promoProducts.promoProducts);

  useEffect(() => {
    dispatch(fetchPromoProducts());
  }, [dispatch]);

  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className={styles.swiperSlide}
      effect={'coverflow'}
      grabCursor
      centeredSlides
      loop
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5
      }}
      speed={300}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      pagination={{ el: '.swiper-pagination', type: 'bullets', clickable: true }}
    >
      {promoProducts.map((promoProduct) => (
        <SwiperSlide key={promoProduct.id}>
          <Banner key={promoProduct.id} promoProduct={promoProduct} />
        </SwiperSlide>
      ))}
      <div className={styles.swiperWrapper}>
        <div className={`swiper-pagination ${styles.bulletClass}`}></div>
      </div>
    </Swiper>
  );
}

export default SwiperSlides;
