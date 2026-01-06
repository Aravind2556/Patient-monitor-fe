import React, { useContext, useEffect, useState } from 'react'
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TbLivePhotoFilled } from "react-icons/tb";
import { FaBell } from "react-icons/fa";

import { RiTempColdFill } from "react-icons/ri";
import { FaWind, FaHeartbeat } from "react-icons/fa";
import { GiScubaMask } from "react-icons/gi";
import ToggleSwitch from './ToggleSwitch';
import { DContext } from '../../context/Datacontext';
import LoadingPage from '../pages/Loading';

function Layout() {

    const { isAuth, currentUser } = useContext(DContext)

    const navItems = [
        { name: 'Dashboard', href: '/', icon: TbLayoutDashboardFilled },
        { name: 'Live Therapy', href: '/live-therapy', icon: TbLivePhotoFilled },
        { name: 'Alerts & Status', href: '/alerts', icon: FaBell },
    ]

    const [recentData, setRecentData] = useState({
        temperature: {
            value: "",
            unit: "°C",
            icon: RiTempColdFill
        },
        airPressure: {
            value: "",
            unit: "Pa",
            icon: FaWind
        },
        heartRate: {
            value: "",
            unit: "bpm",
            icon: FaHeartbeat
        },
        spO2: {
            value: "",
            unit: "%",
            icon: GiScubaMask
        }
    })

    const [compressorStatus, setCompressorStatus] = useState(false)
    const [heaterStatus, setHeaterStatus] = useState(false)
    const [vibratorStatus, setVibratorStatus] = useState(false)

    const [thinkSpeakURL] = useState(process.env.REACT_APP_RECENT_THINKSPEAKURL || "")
    const [writeThinkSpeakURL] = useState(process.env.REACT_APP_WRITE_THINKSPEAKURL || "")

    useEffect(() => {
        if (thinkSpeakURL && isAuth && currentUser) {
            fetch(thinkSpeakURL)
            .then(res => res.json())
            .then(data => {
                if(isAuth && currentUser){
                    const filteredData = (data?.feeds || []).filter(feed => feed.field5 === currentUser.id.toString());
                    const recentFilteredData = filteredData.length > 0 ? filteredData[filteredData.length - 1] : {};

                    setRecentData({
                        temperature: {
                            ...recentData.temperature, value: Number(recentFilteredData?.field1 || 0)
                        },
                        airPressure: {
                            ...recentData.airPressure, value: Number(recentFilteredData?.field2 || 0)
                        },
                        heartRate: {
                            ...recentData.heartRate, value: Number(recentFilteredData?.field3 || 0)
                        },
                        spO2: {
                            ...recentData.spO2, value: Number(recentFilteredData?.field4 || 0)
                        }
                    })
                }
            })
            .catch(err => {
                console.log("Error fetching data from ThinkSpeak:", err)
            })
        }
    }, [thinkSpeakURL, currentUser, isAuth])

    const toggleSwitches = (type, status) => {
        let queryParams = "";
        
        switch(type) {
            case "compressor":
                queryParams = `&field1=${status ? 1 : 0}`;
                break;
            case "heater":
                queryParams = `&field2=${status ? 1 : 0}`;
                break;
            case "vibrator":
                queryParams = `&field3=${status ? 1 : 0}`;
                break;
            default:
                return;
        }

        fetch(`${writeThinkSpeakURL}${queryParams}`)
        .then(res => res.json())
        .then(data => {
            console.log("ThinkSpeak update response:", data);
            if(data > 0) {

            }
            else{
                alert("Failed to update device status!");
            }
        })
        .catch(err => {
            console.log("Error updating ThinkSpeak:", err);
        });
    }

    if (!isAuth || !currentUser || !thinkSpeakURL || !writeThinkSpeakURL) {
        return <LoadingPage/>
    }

  return (
    <div>
        <aside>{recentData.temperature.value} {recentData.airPressure.value} {recentData.heartRate.value} {recentData.spO2.value}
            {
                navItems.map((item, i) => (
                    <div>

                    </div>
                ))
            }
        </aside>
        <main>
            <div className='flex gap-5 items-center'>
                  <ToggleSwitch data={compressorStatus} setData={setCompressorStatus} id="compressor" toggleSwitches={toggleSwitches} />
                  <ToggleSwitch data={heaterStatus} setData={setHeaterStatus} id="heater" toggleSwitches={toggleSwitches} />
                  <ToggleSwitch data={vibratorStatus} setData={setVibratorStatus} id="vibrator" toggleSwitches={toggleSwitches} />
            </div>
        </main>
    </div>
  )
}

export default Layout