import React, {useEffect, useState } from "react"
import PropTypes from 'prop-types'; 
import { Searchbar } from "components/Searchbar/Searchbar"

import {Modal} from "components/Modal/Modal"
import { Container } from "./App.styled"
import getImages from "components/utilities/getImages"
import { ImageGallery } from "components/ImageGallery/ImageGallery"
import { ImageGalleryItem} from "components/ImageGalleryItem/ImageGalleryItem"
import { Button } from "components/Button/Button"
import { Loader } from "components/Loader/Loader"


export const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [hits, setHits] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isShowModal, setIsShowModal] = useState(false)
  const [selectedImg, setSelectedImg] = useState("")
  const [page, setPage] = useState(1)
  const [totalHits, setTotalHits] = useState(0)
  const [error, setError] = useState(null)


  const showModal = () => {
    setIsShowModal(true)
  }

  const closeModal = () => {
    setIsShowModal(false)
    setSelectedImg("")

  }
  
  const selectImg = ({ target }) => {
    if (target.src) {
      setSelectedImg(target.alt);
      showModal();
    }
  };

  const handleClick = () => {
    setPage(page => page + 1);
  };

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

     const fetchImages = async () => {
       setIsLoading(true)
        try {
       
         const {hits, totalHits} = await getImages(searchQuery, page)
          setHits(prev => [...prev, ...hits])
          setTotalHits(totalHits)
              
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false)}
  
  };
    fetchImages();
 
  },[searchQuery, page])


  const createSearchText = value => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <Container>
      <Searchbar createSearchText={createSearchText} />

      {isLoading && <Loader />}
      
      {hits.length > 0 && (
      <ImageGallery onClick={selectImg}>
          <ImageGalleryItem
               searchText={searchQuery}
               images={hits}
               isLoading={isLoading}
   
               page={page}
               totalHits={totalHits} />
      </ImageGallery>)}
      
      { hits && page !== Math.ceil(totalHits / 12) &&  hits.length >= 12 && (
      <Button handleClick={handleClick} />)}
      
      {error && (<p>Something went wrong</p>)}

      {isShowModal && (<Modal closeModal={closeModal} selectedImg={selectedImg} />)}
    </Container>
  )
      
}
App.propTypes = {
   searchQuery : PropTypes.string,
    hits: PropTypes.array,
    isLoading: PropTypes.bool,
    isShowModal: PropTypes.bool,
    selectedImg: PropTypes.string,
    page: PropTypes.number,
    totalHits: PropTypes.func,
    error: PropTypes.string,
}
  
