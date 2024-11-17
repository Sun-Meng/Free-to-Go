// Card Layout, used in both Map Popups and in the List view
import PropTypes from 'prop-types'
import numeral from 'numeral'
import classNames from 'classnames'

export const pluralize = (number, word) => {
  return `${number} ${word}${number === 1 ? '' : 's'} `
}

const MarkerIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M5 7.71428C5 5.15607 7.19204 3 10 3C12.808 3 15 5.15607 15 7.71428C15 9.11527 14.179 10.8133 12.9489 12.6083C12.0915 13.8594 11.1256 15.0366 10.2524 16.1008C10.1673 16.2045 10.0831 16.3071 10 16.4086C9.91686 16.3071 9.83265 16.2045 9.74757 16.1008C8.8744 15.0366 7.9085 13.8594 7.0511 12.6083C5.82101 10.8133 5 9.11527 5 7.71428Z'
      stroke='#566171'
      strokeWidth='2'
    />
  </svg>
)

// 新增的统计信息组件
const StatsBar = ({ rating, views, likes, edits, favorites }) => (
  <div className="flex items-center text-sm mb-2">
    <div className="flex items-center mr-4">
      <span className="ml-1">⭐</span>
      <span className="font-medium">{rating}</span>
    </div>
    <div className="flex items-center mr-4">
      <span className="ml-1">👁️</span>
      <span className="font-medium">{views}</span>
    </div>
    <div className="flex items-center mr-4">
      <span className="ml-1">❤️</span>
      <span className="font-medium">{likes}</span>
    </div>
    <div className="flex items-center mr-4">
      <span className="ml-1">✏️</span>
      <span className="font-medium">{edits}</span>
    </div>
    <div className="flex items-center">
      <span className="ml-1">🔖</span>
      <span className="font-medium">{favorites}</span>
    </div>
  </div>
)

//引用的数据（房价、几个房间、几个浴室、总面积、位置）
export const PropertyData = ({ feature, large = false }) => {
  const {
    //打算放地点名称 sale_price,
    number_of_bedrooms,
    number_of_bathrooms,
    total_livable_area,
    location,
    rating, // 新增的属性
    views, // 新增的属性
    likes, // 新增的属性
    edits, // 新增的属性
    favorites // 新增的属性
  } = feature.properties

  // const price = numeral(sale_price).format('0,0')
  //const bedrooms = pluralize(number_of_bedrooms, 'bedroom')
  //const bathrooms = pluralize(number_of_bathrooms, 'bathroom')
  //const squareFootage = numeral(total_livable_area).format('0,0')


  const largerTextClass = large ? 'text-2xl' : 'text-xl'
  const smallerTextClass = large ? 'text-base' : 'text-sm'
  const xPaddingClass = large ? 'p-0' : 'p-3'

  return (
    <div className={classNames('py-1.5', xPaddingClass)}>
      <h5
        className={classNames(
          'mb-1.5 font-bold tracking-tight',
          largerTextClass
        )}
      >
        {location}
      </h5>
      {/* <p className={classNames('mb-4 font-normal', smallerTextClass)}>
        {bedrooms} • {bathrooms} • {squareFootage} ft<sup>2</sup>
      </p> */}
      <p className={classNames('mb-4 font-normal', smallerTextClass)}>
        营业时间：9:00-20:00<br />
        提供无障碍服务：Y<br />
        联系电话：xxxxx
      </p>
      <StatsBar 
        rating={rating} 
        views={views} 
        likes={likes} 
        edits={edits} 
        favorites={favorites} 
      />
      <div
        className={classNames(
          'flex items-center text-sm mb-3',
          smallerTextClass
        )}
      >
        <MarkerIcon />
        <p className='font-medium text-gray-500 ml-1.5'>{location}</p>
      </div>
    </div>
  )
}

PropertyData.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.shape({
      sale_price: PropTypes.any,
      number_of_bedrooms: PropTypes.any,
      number_of_bathrooms: PropTypes.any,
      total_livable_area: PropTypes.any,
      location: PropTypes.any
    })
  }),
  large: PropTypes.bool
}

const Card = ({ feature, width = 'auto', shortImage = false, onClick }) => {
  const handleClick = () => {
    onClick(feature)
  }

  const { imageUrl } = feature.properties

  return (
    <div className='cursor-pointer' onClick={handleClick}>
      <div
        className='bg-white border border-gray-200 rounded-2xl '
        style={{
          width,
          boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)'
        }}
      >
        <div
          className={classNames('bg-cover  m-1.5', {
            'h-44': shortImage,
            'h-52': !shortImage
          })}
          style={{
            backgroundImage: `url("${import.meta.env.BASE_URL}/${imageUrl}")`,
            borderRadius: 11.28
          }}
        ></div>
        <PropertyData feature={feature} />
      </div>
    </div>
  )
}

Card.propTypes = {
  feature: PropTypes.shape({
    properties: PropTypes.shape({
      imageUrl: PropTypes.string
    })
  }),
  onClick: PropTypes.func,
  shortImage: PropTypes.bool,
  width: PropTypes.string
}

export default Card
