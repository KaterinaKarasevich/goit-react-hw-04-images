import { ImageGalleryItemStyle, ImageGalleryItemImage } from "components/ImageGalleryItem/ImageGalleryItem.styled"

export const ImageGalleryItem = ({ searchText, images, isLoading, page, totalHits }) => {
    return (<>
        {images && images.map(image => {
            return (
               <ImageGalleryItemStyle key={image.id}>
                 <ImageGalleryItemImage
                   src={image.webformatURL}
                   alt={image.largeImageURL}
                 />
               </ImageGalleryItemStyle>  
            )
        })}
        {images.length === 0 && searchText && isLoading===false &&(
          <p>{`Nothing found for ${searchText}`}</p>
        )}
    </>
    )
}

