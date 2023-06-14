import './randomCharPerson.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import { Component } from 'react'
import MarvelService from '../../services/MarvelService'
import ServicesError from '../../services/ServicesError'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'



class RandomCharPerson extends Component {
    state = {
        person: {},
        loader: true,
        error: false
    }

    componentDidMount() {
        this.marvelsPersons()
    }

    marvelService = new MarvelService()

    loaderPerson = (res) => {
        this.setState({
            person: res,
            loader: false
        })
    }

    togglePerson = () => {
        this.setState({
            loader: true
        })
    }

    servicesError = (res) => {
        this.setState({
            loader: false,
            error: true
        })
    }

    marvelsPersons = async () => {
        this.togglePerson()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        await this.marvelService.getPerson(id)
            .then(res => { this.loaderPerson(res) })
            .catch(res => this.servicesError(res))
    }




    render() {
        const { person: { name, description, thumbnail, homepage, wiki }, loader, error } = this.state
        const errors = error ? <ServicesError /> : null
        const spinner = loader ? <LoadingSpinner /> : null
        let imgStyle = { 'objectFif': 'cover' }
        if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            imgStyle = { 'objectFif': 'unset' }
        }
        const content = !(error || spinner) ? <div className='randomPerson'>
            <div className='img'>
                <img src={thumbnail} alt="name" style={imgStyle} />
            </div>
            <div className='personInfo'>
                <p className='name'>{name}</p>
                <p className='info'>{description}</p>
                <div className='sellectLink'>
                    <a href={homepage} className='buttons homepage'>HOMEPAGE</a>
                    <a href={wiki} className='buttons wiki'>WIKI</a>
                </div>
            </div>
        </div> : null
        return (
            <section className='randomCharPerson'>
                {errors}
                {spinner}
                {content}
                <div className='randomPersonToggle'>
                    <p className='randomPersonTittle'>Random character for today! <br />Do you want to get to know him better?</p>
                    <p className='randomPersonTittle'>Or choose another one</p>
                    <button className='buttons try_it' disabled={loader} onClick={this.marvelsPersons}>TRY IT </button>
                    <img src={mjolnir} alt="" />

                </div>
            </section>
        )
    }
}

export default RandomCharPerson