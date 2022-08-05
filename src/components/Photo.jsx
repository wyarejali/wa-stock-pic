import React from 'react'
import icon from '../assets/download.png'

const Photo = ({
  urls: { regular: imgUrl },
  links: { download },
  user: {
    name,
    for_hire: hire,
    links: { html },
    profile_image: { medium: author_image },
  },
  likes,
}) => {
  return (
    <div className='single-image'>
      <img src={imgUrl} alt='image1' />
      <a href={`${download}&force=ture`} className='download'>
        <img src={icon} alt='download' />
      </a>
      <div className='image-info'>
        <div className='author-info'>
          <img src={author_image} alt='author' />
          <div>
            <h3 className='name'>{name}</h3>
            {hire && <a href={html}>Available for hire</a>}
          </div>
        </div>
        <p className='likes'>{likes} Likes</p>
      </div>
    </div>
  )
}

export default Photo
