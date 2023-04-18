import  React, {useState } from "react"
import PropTypes from 'prop-types'; 
import loupe from "components/utilities/loupe.svg"
import { SearchBarData, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./Searchbar.styled"


export const Searchbar = ({createSearchText}) => {
  const [value, setValue] = useState("")
    
  
const handleChange = (evt) => {
   // this.setState({ value: evt.currentTarget.value });
   setValue(evt.currentTarget.value) 
  };

const handleSubmit = (e) => {
  e.preventDefault()
  createSearchText(value)
  setValue("");
 
}
 
return (
<SearchBarData>
  <SearchForm onSubmit={handleSubmit}>
    <SearchFormButton type="submit" style={{ backgroundImage: `url(${loupe})` }}>
      <SearchFormButtonLabel>Search</SearchFormButtonLabel>
    </SearchFormButton>

    <SearchFormInput
      type="text"
      autocomplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={handleChange}
      value={value}
        
    />
  </SearchForm>
</SearchBarData>)
 
}

Searchbar.propTypes = {
   value : PropTypes.string,   
}

// export class Searchbar extends Component {
//     state = {
//       value: "",
//   }
  
// handleChange = (evt) => {
//     this.setState({ value: evt.currentTarget.value });
    
//   };

// handleSubmit = (e) => {
//   e.preventDefault()
//   this.props.createSearchText(this.state.value)
//   this.setState({value: " "});
//   //console.log(this.state.value)
// }
//   render() {
  
// return (
// <SearchBarData>
//   <SearchForm onSubmit={this.handleSubmit}>
//     <SearchFormButton type="submit" style={{ backgroundImage: `url(${loupe})` }}>
//       <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//     </SearchFormButton>

//     <SearchFormInput
//       type="text"
//       autocomplete="off"
//       autoFocus
//         placeholder="Search images and photos"
//         onChange={this.handleChange}
//         value={this.state.value}
        
//     />
//   </SearchForm>
// </SearchBarData>)
//  }
// }