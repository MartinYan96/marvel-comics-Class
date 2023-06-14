import { Component } from "react"
import './Header.scss'

class Header extends Component {
    render() {
        return (
            <header className="header" >
                <a href="#" className="logo" style={{color:'#9F0013'}}>Marvel <span style={{color:'black'}}>information portal</span></a>  

                <ul className="pages" >
                    <li style={{ paddingRight: 10 }}><a href="#">Characters</a></li>
                    /
                    <li style={{ paddingLeft: 10 }}><a href="#">Comics</a></li>
                </ul>
            </header>
        )
    }
}

export default Header