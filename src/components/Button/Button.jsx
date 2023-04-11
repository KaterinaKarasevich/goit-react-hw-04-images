import { ButtonStyle } from "components/Button/Button.styled"
export const Button = ({ handleClick }) => {
    return (
        <ButtonStyle onClick={handleClick} type="button">Load more</ButtonStyle>
    )
}