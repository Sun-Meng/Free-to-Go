import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import mapboxgl from 'mapbox-gl'

const NewMarker = ({ feature, map, children }) => {
  const markerRef = useRef()
  const markerEl = useRef()
  const popupEl = useRef()

  const [active, setActive] = useState(false)

  const handlePopupOpen = () => {
    setActive(true)
  }

  const handlePopupClose = () => {
    setActive(false)
  }

  useEffect(() => {
    const marker = new mapboxgl.Marker({
      element: markerEl.current
    })
      .setLngLat(feature.geometry.coordinates)
      .addTo(map)

    markerRef.current = marker
  }, [feature])

  useEffect(() => {
    const marker = markerRef.current
    if (!marker) return

    let popup

    if (children) {
      popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true,
        closeOnMove: true,
        maxWidth: '300px',
        offset: 14
      })
        .setDOMContent(popupEl.current)
        .on('open', handlePopupOpen)
        .on('close', handlePopupClose)
    }

    marker.setPopup(popup)
  }, [children])

  if (!feature) return null
  // 根据功能类型选择不同的标记样式
  const markerType = feature.properties.type;
  let markerContent;
  
  switch (markerType) {
    case 'restaurant':
        markerContent = '🍽️'; // 餐饮标记
        break;
    case 'park':
        markerContent = '🌳'; // 公园标记
        break;
    case 'library':
        markerContent = '📚'; // 图书馆标记
        break;
    default:
        markerContent = '🏠'; // 默认标记
    }

  return (
    <div>
      <div
        ref={markerEl}
        className={classNames(
          'marker rounded-full shadow-lg hover:bg-blue-200 border hover:border-blue-400 mapboxgl-marker mapboxgl-marker-anchor-center',
          {
            'bg-blue-500 border-blue-400': active,
            'bg-white border-transparent': !active
          }
        )}
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div>{markerContent}</div> {/* 使用 emoji 或者图标 */}
      </div>
      <div ref={popupEl}>{children}</div>
    </div>
  )
}

NewMarker.propTypes = {
  children: PropTypes.any,
  feature: PropTypes.shape({
    geometry: PropTypes.shape({
      coordinates: PropTypes.any
    }),
    properties: PropTypes.shape({
      sale_price: PropTypes.any,
      type: PropTypes.string // 新增类型属性
    })
  }),
  map: PropTypes.any
}

export default NewMarker 