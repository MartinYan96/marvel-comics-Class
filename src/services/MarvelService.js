import { Component } from 'react';

class MarvelService extends Component {
    _offset = 210

    getResources = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`error ${url}`);
        }

        return await res.json()
    }

    getAllPerson = async (offset = this._offset) => {
        const res = await this.getResources(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=2fe2037751b47438b15ee307bff6ce59`)
        return this.getAllPersons(res)
    }

    getPerson = async (id) => {
        const res = await this.getResources(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=2fe2037751b47438b15ee307bff6ce59`)
        return (this.getPersons(res))
    }


    totalNumber = async () => {
        const totalNum = await this.getResources('https://gateway.marvel.com:443/v1/public/characters?apikey=2fe2037751b47438b15ee307bff6ce59')
        return (this.total(totalNum))
    }

    total = (total) => {
        return total.data.total
    }

    getPersons = (res) => {
        const result = res.data.results[0]
        return {
            id: result.id,
            name: result.name,
            description: result.description === '' ? 'no description' : result.description,
            thumbnail: result.thumbnail.path + '.' + result.thumbnail.extension,
            homepage: result.urls[0].url,
            wiki: result.urls[1].url
        }
    }

    getAllPersons = (res) => {
        return res.data.results.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description === '' ? 'no description' : item.description,
                thumbnail: item.thumbnail.path + '.' + item.thumbnail.extension,
                homepage: item.urls[0].url,
                wiki: item.urls[1].url,
                comics: item.comics.items,
                total: res.data.total
            }
        })
    }
}
export default MarvelService