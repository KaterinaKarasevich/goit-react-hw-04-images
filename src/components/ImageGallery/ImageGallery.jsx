
import { ImageGalleryStyle } from "components/ImageGallery/ImageGallery.styled"

export const ImageGallery = ({children, onClick }) => {
    return <ImageGalleryStyle onClick={onClick}>{children}</ImageGalleryStyle>

}