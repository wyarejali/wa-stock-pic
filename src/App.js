import React, { useEffect, useState } from 'react'
import Photo from './components/Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = 'https://api.unsplash.com/photos/'
const searchUrl = 'https://api.unsplash.com/search/photos/'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [photos, setPhotos] = useState([])

  /**
   * fetch photos
   * search photos
   */
  const fetchImages = async () => {
    setIsLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      setPhotos((oldData) => {
        if (page === 1 && query) {
          return data.results
        } else if (query) {
          return [...oldData, ...data.results]
        } else {
          return [...oldData, ...data]
        }
      })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query !== '') {
      setPage(1)
      fetchImages()
    }
  }

  useEffect(() => {
    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const event = () => {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      setPage((oldPage) => {
        return oldPage + 1
      })
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  return (
    <>
      <section className='banner'>
        <div className='container'>
          <div className='form-wrapper'>
            <div className='banner-info'>
              <h1>Stock Pic</h1>
              <p>The internet’s source of freely-usable images.</p>
              <p>Powered by creators everywhere.</p>
            </div>
            <form onSubmit={handleSubmit} className='banner-form'>
              <div className='form-group'>
                <input
                  type='text'
                  className='search-input'
                  placeholder='Search free high-resulation photos'
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                />
                <button type='submit' className='search-btn'>
                  {isLoading ? '...loading' : 'Search'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className='photo-gallery'>
        <div className='container'>
          {photos.length < 1 && (
            <h3 style={{ fontSize: '33px ', textAlign: 'center' }}>
              There is no results with your search
            </h3>
          )}
          <div className='photo-area'>
            {photos.map((photo, index) => {
              return <Photo key={index} {...photo} />
            })}
          </div>

          {isLoading && (
            <h3 style={{ fontSize: '33px ', textAlign: 'center' }}>
              ...Loading
            </h3>
          )}
        </div>
      </section>
    </>
  )
}

export default App
