import { Component } from "react"
import './Header.scss'

class Header extends Component {
    render() {
        return (
            <header className="header" >
                <p className="logo" style={{color:'#9F0013'}}>Marvel <span style={{color:'black'}}>information portal</span></p>  

                <ul className="pages" >
                    <li style={{ paddingRight: 10 }}>Characters</li>
                    /
                    <li style={{ paddingLeft: 10 }}>Comics</li>
                </ul>
            </header>
        )
    }
}

export default Header