import './charContent.scss'
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';
// import ServicesError from '../../services/ServicesError'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const Nocomics = () => {
    return <p> no comics</p>
}

class CharContent extends Component {
    state = {
        list: [],
        personInfo: {},
        loading: true,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
        total: null
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.marvelService.totalNumber().then(a => this.setState({ total: a }))
        this.charContentplus()
    }


    listLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    charContentplus = (offset) => {
        this.listLoading()
        this.marvelService.getAllPerson(offset).then(this.loaderPersons)
    }


    loaderPersons = (res) => {
        const { offset, total, } = this.state
        let ended = false

        if (offset >= total && total !== null) {
            ended = true
        }

        this.setState(({ offset, list }) => ({
            list: [...list, ...res],
            loading: false,
            offset: offset + 9,
            newItemLoading: false,
            charEnded: ended,
        }))

    }


    render() {
        const { list, personInfo, loading, offset, newItemLoading, charEnded } = this.state
        return (
            <section className="charContent">
                {loading ? LoadingSpinner() :
                    <div className="personListBlock">
                        <div className="personList">
                            {list.map((item, index) => {
                                let imgStyle = { 'objectFif': 'cover' }
                                if (item.description === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                                    imgStyle = { 'objectFif': 'unset' }
                                }

                                return (<div key={item.id} className='personItem' onClick={() => { this.setState({ personInfo: item }) }} >
                                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                                    <p className='name'>{item.name}</p>
                                </div>)
                            })}


                        </div>
                        <button className='buttons loadMore'
                            disabled={newItemLoading}
                            onClick={() => this.charContentplus(offset)}
                            style={{ display: charEnded ? 'none ' : 'block' }}
                        >LOAD MORE
                        </button>
                    </div>
                }
                <div className="personInfo">
                    <div className="imgAndName">
                        <img src={personInfo.thumbnail} alt="" />
                        <div className='personNameAndLink'>
                            <p className='personName'>{personInfo.name}</p>
                            <a href={personInfo.homepage} className='buttons homepage'>HOMEPAGE</a>
                            <a href={personInfo.wiki} className='buttons wiki'>WIKI</a>
                        </div>
                    </div>
                    <p className="charInfo">
                        {personInfo.description}
                    </p>
                    <ul className="comics">Comics:
                        {
                            personInfo.comics === undefined || personInfo.comics.length === 0 ? < Nocomics /> : personInfo.comics.map((item, i) => {
                                if (i > 10){
                                    return
                                }
                                return <li key={i} className='comicsItem' > {item.name}</li>
                            })
                        }
                    </ul>
                </div>
            </section >
        )
    }
}


export default CharContent