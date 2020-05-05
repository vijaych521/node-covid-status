const chalk = require('chalk')
const request = require('request')

const covid_19_resourceAPI = 'https://api.covid19india.org/resources/resources.json'
let data = [];

/**
 * Search function with callback
 * @param {*} stateName 
 * @param {*} callback 
 */
const searchCallback = (stateName, callback) => {
    console.log(chalk.green('inside of SearchCallback function!!!'))
    request({ url: covid_19_resourceAPI }, (error, response) => {
        if (error) {
            callback('Something went wrong !!!', undefined)
        } else if (response.body.error) {
            callback("body error !!!")
        } else {
            console.log(chalk.red('at line 20'))
            const raw_data = JSON.parse(response.body)
            data = raw_data.resources
            const isStateFound = data.filter((d) => d.state === stateName)
            console.log(isStateFound)
            if (isStateFound && isStateFound.length > 0) {
                callback(undefined, isStateFound)
            } else {
                console.log(chalk.red('at line 26'))
                callback(undefined, {
                    error: 'Enter valid state name !!!',
                    cause: stateName+' Not Found'
                })
            }

        }
    })
}

const getStates = (callback) => {
    request({ url: covid_19_resourceAPI }, (error, response) => {
        if (error) {
            callback('Something went wrong !!!', undefined)
        } else if (response.body.error) {
            callback("body error !!!")
        } else {
            const raw_data = JSON.parse(response.body)
            const data = raw_data.resources
            const temp = []
            data.forEach(element => {
                temp.push(element.state)
            });
            const states = temp.filter((v, i, a) => a.indexOf(v) === i)
            callback(undefined, states)
        }
    })
}

const getCategories = (callback) => {
    request({ url: covid_19_resourceAPI }, (error, response) => {
        if (error) {
            callback('Something went wrong !!!', undefined)
        } else if (response.body.error) {
            callback("body error !!!")
        } else {
            const raw_data = JSON.parse(response.body)
            const data = raw_data.resources
            const temp = []
            data.forEach(element => {
                temp.push(element.category)
            });
            const categories = temp.filter((v, i, a) => a.indexOf(v) === i)
            callback(undefined, categories)
        }
    })
}
module.exports = {
    searchCallback: searchCallback,
    getStates: getStates,
    getCategories: getCategories
}