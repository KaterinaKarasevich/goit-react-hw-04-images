import React, { Component } from "react"
import PropTypes from 'prop-types'; 
import { Searchbar } from "components/Searchbar/Searchbar"

import {Modal} from "components/Modal/Modal"
import { Container } from "./App.styled"
import {getImages} from "components/utilities/getImages"
import { ImageGallery } from "components/ImageGallery/ImageGallery"
import { ImageGalleryItem} from "components/ImageGalleryItem/ImageGalleryItem"
import { Button } from "components/Button/Button"
import { Loader } from "components/Loader/Loader"

export class App extends Component {
  state = {
    searchQuery: "",
    hits: [],
    isLoading: false,
    isShowModal: false,
    selectedImg: "",
    page: 1,
    totalHits: 0,
    error: null,
    
  };

 showModal = () => {
     this.setState({ isShowModal: true })
 }

 closeModal = () => {
     this.setState({ isShowModal: false, selectedImg: "" })
 }  
  
 selectImg = ({ target }) => {
     if (target.src) {
       this.setState({selectedImg: target.alt});
       this.showModal();
   }
   } 
  handleClick = ({ page}) => {
     this.setState(prevState => ({
       page: prevState.page + 1,
     }));
  };
  
  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery ||
      prevState.page !== page) {
      this.fetchImages(searchQuery, page);
      this.setState({ isLoading: true });
    }
  }

  fetchImages = async (searchQuery, page) => {
      try {
         const {hits, totalHits} = await getImages(searchQuery, page);
          this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          totalHits: totalHits
        }));
            
        } catch (error) {
          this.setState({ error: error.message});
        } finally {
          this.setState({ isLoading: false })}

  };
  
  createSearchText = value => {
    
    this.setState({
       searchQuery: value,
       hits: [],
       isLoading: false,
       isShowModal: false,
       selectedImg: "",
       page: 1,
       totalHits: 0,
       error: null,
    });
  };

render() {
  const { searchQuery, isShowModal, isLoading, hits, selectedImg, page, totalHits, error  } = this.state
  return (
    <Container>
      <Searchbar createSearchText={this.createSearchText} />

      {isLoading && <Loader />}
      
      {hits.length > 0 && (
      <ImageGallery onClick={this.selectImg}>
          <ImageGalleryItem
               searchText={searchQuery}
               images={hits}
               isLoading={isLoading}
   
               page={page}
               totalHits={totalHits} />
      </ImageGallery>)}
      
      { hits && page !== Math.ceil(totalHits / 12) &&  hits.length >= 12 && (
      <Button handleClick={this.handleClick} />)}
      
      {error && (<p>Something went wrong</p>)}

      {isShowModal && (<Modal closeModal={this.closeModal} selectedImg={selectedImg} />)}
    </Container>
      )
    }
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
  

