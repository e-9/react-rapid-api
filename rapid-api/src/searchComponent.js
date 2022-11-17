import React from 'react';
import { Card } from "semantic-ui-react";

class SearchComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.searchHistoricalEvent = this.searchHistoricalEvent.bind(this);
        this.getKeywordValue = this.getKeywordValue.bind(this);
        this.state = {
            eventKeyword: null,
            historicEvents: []
        }
    }
    
    searchHistoricalEvent() {
        //The entire keyword is received here after being fully entered
        console.log("This is the new state: " + this.state.eventKeyword);

        //Call API here with the searched keyword
        const options = {     
            method: 'GET',     
            headers: {         
                'X-RapidAPI-Key': '',         
                'X-RapidAPI-Host': ''     
            } 
        }; 
        fetch('https://historical-events-by-api-ninjas.p.rapidapi.com/v1/historicalevents?text='+ this.state.eventKeyword, options)     
        .then(response => response.json())     
        .then(response => {
            console.log(response);
            this.setState({
                historicEvents: response
            });
        })
        .catch(err => console.error(err));

    }
    getKeywordValue(event){
        const val = event.target.value;
        this.setState({
            eventKeyword: val
        });
    }

    render()
    {
        return (
        // <div>
        //     
            
        

        // </div>
        <div>
            <input id="searchText" type="text" placeholder="Search here" onChange={this.getKeywordValue}></input>
            <button id="searchButton" onClick={this.searchHistoricalEvent}>Search</button>
        {
             this.state.historicEvents.length == 0 ? 
               "this is empty"
               :
               this.state.historicEvents.map((row,i)=>{
                
                return <Card key={i}>
                            <Card.Content header={"Date:" + row.month +'/' + row.day + '/' + row.year}/>
                            <Card.Content>
                                <Card.Description>
                                    {row.event}
                                </Card.Description>
                            </Card.Content>
                        </Card>

               })
                
            
        }
        </div>
        );
    }

}

export default SearchComponent;