import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { THINGSPEAK_URL } from "../utils/ThinkSpeak";



export const DContext = createContext()


const DataContext = ({ children }) => {

    const BeURL = process.env.REACT_APP_BeURL
    const [isAuth, setIsAuth] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)

    const [fieldOne, setFieldOne] = useState(null)
    const [fieldTwo, setFieldTwo] = useState(null)
    const [fieldThree, setFieldThree] = useState(null)
    const [fieldFour, setFieldFour] = useState(null)
    // const [fieldFive, setFieldFive] = useState(null)


    const [recentFieldOne, setRecentFieldOne] = useState(null)
    const [recentFieldTwo, setRecentFieldTwo] = useState(null)
    const [recentFieldThree, setRecentFieldThree] = useState(null)
    const [recentFieldFour, setRecentFieldFour] = useState(null)

    const [recentFieldFive,setRecentFieldFive]=useState(null)

    const [recentFieldSix,setRecentFieldSix]=useState(null)
    const [recentFieldSeven, setRecentFieldSeven] = useState(null)
    const [recentFieldEight, setRecentFieldEight]=useState(null)



    useEffect(() => {
        fetch(`${BeURL}/checkauth`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setIsAuth(true)
                    setCurrentUser(data.user)
                }
                else {
                    setIsAuth(false)
                    setCurrentUser({})
                }
            })
            .catch(err => {
                setIsAuth(null)
                setCurrentUser(null)
                console.log("Erron in fetching User:", err)
                alert("Trouble in connecting to the Server, please try again later.")
            })
    }, [])


    const handleLogout = () => {
        fetch(`${BeURL}/logout`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message)
                if (data.success) {
                    setIsAuth(false)
                    setCurrentUser({})
                    window.location.href = "/"
                }
            })
            .catch(err => {
                console.log("Erron in Logout:", err)
                alert("Trouble in connecting to the Server, please try again later.")
            })
    }


    const controls = {
        show: true,
        download: true,
        selection: false,
        zoom: false,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
        zoomEnabled: true,
        autoSelected: 'zoom'
    };



    useEffect(() => {
        const fetchData = async () => {
            fetch(THINGSPEAK_URL)
                .then(res => res.json())
                .then(data => {
                    console.log("data:", data)
                    if (data && data.feeds && data.feeds.length > 0) {
                        const xAxis = data.feeds.map(feed => new Date(feed.created_at).getTime())

                        setFieldOne({
                            "x-axis": xAxis,
                            "y-axis": data.feeds.map(feed => Number(feed.field1) || 0),
                            color: "green",
                            seriesName: 'Temperature'
                        })

                        setFieldTwo({
                            "x-axis": xAxis,
                            "y-axis": data.feeds.map(feed => Number(feed.field2) || 0),
                            color: "red",
                            seriesName: 'Pressure'
                        })

                        setFieldThree({
                            "x-axis": xAxis,
                            "y-axis": data.feeds.map(feed => Number(feed.field3) || 0),
                            color: "orange",
                            seriesName: 'Heart Rate'
                        })

                        setFieldFour({
                            "x-axis": xAxis,
                            "y-axis": data.feeds.map(feed => Number(feed.field4) || 0),
                            color: "Fuchsia",
                            seriesName: 'SPO2'
                        })

                        // setFieldFive({
                        //     "x-axis": xAxis,
                        //     "y-axis": data.feeds.map(feed => Number(feed.field5) || 0),
                        //     color: "green",
                        //     seriesName: 'HEMOBLOIN'
                        // })

                        const recentFieldOne = data.feeds.slice(-1)[0].field1
                        setRecentFieldOne(recentFieldOne)

                        const recentFieldTwo = data.feeds.slice(-1)[0].field2
                        setRecentFieldTwo(recentFieldTwo)

                        const recentFieldThree = data.feeds.slice(-1)[0].field3
                        setRecentFieldThree(recentFieldThree)

                        const recentFieldFour = data.feeds.slice(-1)[0].field4
                        setRecentFieldFour(recentFieldFour)


                        const recentFieldSix= data.feeds.slice(-1)[0].field6
                        setRecentFieldSix(recentFieldSix)

                        const recentFieldSeven= data.feeds.slice(-1)[0].field6
                        setRecentFieldSeven(recentFieldSeven)

                        const recentFieldEight = data.feeds.slice(-1)[0].field6
                        setRecentFieldEight(recentFieldEight)

                        // const recentFieldFive = data.feeds.slice(-1)[0].field6
                        // setRecentFieldFive(recentFieldFive)
                    }
                    else {
                        setFieldOne({
                            "x-axis": [],
                            "y-axis": [],
                            color: "black",
                            seriesName: 'Green'
                        })
                        setFieldTwo({
                            "x-axis": [],
                            "y-axis": [],
                            color: "black",
                            seriesName: 'RED'
                        })
                        setFieldThree({
                            "x-axis": [],
                            "y-axis": [],
                            color: "black",
                            seriesName: 'ECG'
                        })
                        setFieldFour({
                            "x-axis": [],
                            "y-axis": [],
                            color: "#ED254E",
                            seriesName: 'SPO2'
                        })
                        // setFieldFive({
                        //     "x-axis": [],
                        //     "y-axis": [],
                        //     color: "#00F874",
                        //     seriesName: 'HEMOBLOIN'
                        // })
                    }
                })
                .catch(err => {
                    console.log("Error in fetching from Thinkspeak:", err)
                })
        };
        let intervalId
        if (THINGSPEAK_URL) {
            fetchData();
            // Optionally, set up polling for live data updates (e.g., every 30 seconds)
            intervalId = setInterval(fetchData, 5000);
        }
        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [THINGSPEAK_URL]);


    const data = { isAuth, currentUser, setIsAuth, setCurrentUser, BeURL, handleLogout, fieldOne, fieldTwo, fieldThree, fieldFour, controls, recentFieldOne, recentFieldTwo, recentFieldThree, recentFieldFour }

    return (
        <DContext.Provider value={data}>
            {children}
        </DContext.Provider>
    )
}

export default DataContext