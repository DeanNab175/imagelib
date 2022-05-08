import { useState } from "react"

function Search(props) {
    const [input, setInput] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault()
        props.onSubmit(input)
    }
  return (
    <div className="search">
        <form onSubmit={onSubmitHandler}>
            <input 
                type="text" 
                placeholder="Search an image"
                value={input}
                onChange={e => setInput(e.target.value) } 
                />
        </form>
    </div>
  )
}

export default Search