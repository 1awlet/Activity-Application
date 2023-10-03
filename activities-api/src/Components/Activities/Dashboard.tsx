import { useState, useEffect } from "react";
import { Activity } from '../../App';
import SingleActivity from "../SingleActivity/activity";
import "./style.css";
import Details from "../DetailsView/Details";
import EditForm from "../Edit-Forms/Edit-Forms";
import { useStore } from "../../Store/store";
import { observer } from "mobx-react-lite";
type prop = {
    activities: Activity[],
    createOrEditActivityHandlar: (activity:Activity)=>void,

    DeleteActivity: (activityId:string)=> void
}



export default observer( function DashBoard(
    { activities, createOrEditActivityHandlar,DeleteActivity }
    : prop) {
    const [filteredData, setFilteredData] = useState(activities);
    const [userInput, setUserInput] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<Activity | undefined>(undefined);
    
    const {activityStore} = useStore();
    const searchHandlar = (event: any) => {
        const value = event.target.value;
        setUserInput(value);
    }

    const CancelSelectedEvent = () => {
        setSelectedEvent(undefined);
    }
  
    return (
        <div>
          
            {
            activities.map((item) => (
                <div className="All-activites" key={item.id}>
                    <SingleActivity 
                    activity={item} 
                    DeleteActivity={DeleteActivity}
                    />     
                    </div>

            ))
            }

            {
             activityStore.selectedActivity &&  activityStore.editMode==false &&
                <Details 
                createOrEditActivityHandlar={createOrEditActivityHandlar}
                />
            }

            {
                activityStore.editMode&& <EditForm activities ={activityStore.selectedActivity}  createOrEditActivityHandlar={createOrEditActivityHandlar} />
            }

        </div>
    )
}
)


