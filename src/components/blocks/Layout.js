import React, { useContext, useEffect, useState } from 'react'
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TbLivePhotoFilled } from "react-icons/tb";
import { FaBell } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import { RiTempColdFill } from "react-icons/ri";
import { FaWind, FaHeartbeat } from "react-icons/fa";
import { GiScubaMask } from "react-icons/gi";
import ToggleSwitch from './ToggleSwitch';
import { DContext } from '../../context/Datacontext';
import LoadingPage from '../pages/Loading';

function Layout({ children }) {

    const { isAuth, currentUser, setIsAuth, setCurrentUser, BeURL, handleLogout } = useContext(DContext)
    const [activeNav, setActiveNav] = useState(window.location.pathname)

    const navItems = [
        { name: 'Dashboard', href: '/', icon: TbLayoutDashboardFilled },
        { name: 'Live Therapy', href: '/live-therapy', icon: TbLivePhotoFilled },
        { name: 'Alerts & Status', href: '/alerts', icon: FaBell },
    ]

    const [recentData, setRecentData] = useState({
        temperature: {
            value: "",
            unit: "°C",
            icon: RiTempColdFill,
            label: "Temperature"
        },
        airPressure: {
            value: "",
            unit: "Pa",
            icon: FaWind,
            label: "Air Pressure"
        },
        heartRate: {
            value: "",
            unit: "bpm",
            icon: FaHeartbeat,
            label: "Heart Rate"
        },
        spO2: {
            value: "",
            unit: "%",
            icon: GiScubaMask,
            label: "SpO2"
        }
    })

    const [compressorStatus, setCompressorStatus] = useState(false)
    const [heaterStatus, setHeaterStatus] = useState(false)
    const [vibratorStatus, setVibratorStatus] = useState(false)
    const [switchesDisabled, setSwitchesDisabled] = useState(false)
    const [countdown, setCountdown] = useState(0)

    const [thinkSpeakURL] = useState(process.env.REACT_APP_RECENT_THINKSPEAKURL || "")
    const [writeThinkSpeakURL] = useState(process.env.REACT_APP_WRITE_THINKSPEAKURL || "")

    useEffect(() => {
        if (thinkSpeakURL && isAuth && currentUser) {
            fetch(thinkSpeakURL)
                .then(res => res.json())
                .then(data => {
                    if (isAuth && currentUser) {
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

    // Fetch device statuses (compressor/heater/vibrator) from ThingSpeak channel 3220683
    // Uses the last entry's field1, field2, field3 where "1" indicates ON/true
    useEffect(() => {
        const statusURL = 'https://api.thingspeak.com/channels/3220683/feeds.json?api_key=3D0IZSLC23R5ZK3B';
        const fetchStatus = () => {
            fetch(statusURL)
                .then(res => res.json())
                .then(data => {
                    const feeds = data?.feeds || [];
                    const last = feeds.length > 0 ? feeds[feeds.length - 1] : null;
                    if (last) {
                        setCompressorStatus(last.field1 === "1");
                        setHeaterStatus(last.field2 === "1");
                        setVibratorStatus(last.field3 === "1");
                    }
                })
                .catch(err => {
                    console.log("Error fetching device statuses from ThinkSpeak:", err);
                });
        };

        if (isAuth) {
            fetchStatus();
            const intervalId = setInterval(fetchStatus, 8000);
            return () => clearInterval(intervalId);
        }
    }, [isAuth]);

    useEffect(() => {
        if (switchesDisabled && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        } else if (countdown === 0 && switchesDisabled) {
            setSwitchesDisabled(false)
        }
    }, [countdown, switchesDisabled])

    const toggleSwitches = (type, status) => {
        if (switchesDisabled) return;

        const next = !status;

        let queryParams = "";

        switch (type) {
            case "compressor":
                setCompressorStatus(next);
                queryParams = `&field1=${next ? 1 : 0}`;
                break;
            case "heater":
                setHeaterStatus(next);
                queryParams = `&field2=${next ? 1 : 0}`;
                break;
            case "vibrator":
                setVibratorStatus(next);
                queryParams = `&field3=${next ? 1 : 0}`;
                break;
            default:
                return;
        }

        setSwitchesDisabled(true);
        setCountdown(13);

        fetch(`${writeThinkSpeakURL}${queryParams}`)
            .then(res => res.json())
            .then(data => {
                console.log("ThinkSpeak update response:", data);
                if (!(data > 0)) {
                    alert("Failed to update device status!");
                    // revert state if failed
                    switch (type) {
                        case "compressor":
                            setCompressorStatus(status);
                            break;
                        case "heater":
                            setHeaterStatus(status);
                            break;
                        case "vibrator":
                            setVibratorStatus(status);
                            break;
                        default:
                            break;
                    }
                }
            })
            .catch(err => {
                console.log("Error updating ThinkSpeak:", err);
                // revert on error
                switch (type) {
                    case "compressor":
                        setCompressorStatus(status);
                        break;
                    case "heater":
                        setHeaterStatus(status);
                        break;
                    case "vibrator":
                        setVibratorStatus(status);
                        break;
                    default:
                        break;
                }
            });
    }

    if (!isAuth || !currentUser || !thinkSpeakURL || !writeThinkSpeakURL) {
        return <LoadingPage />
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50">
            {/* Sidebar - Left on large screens */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-slate-200 shadow-lg">
                {/* Logo/Brand */}
                <div className="p-6 border-b border-slate-200">
                    <h1 className="text-2xl font-extrabold text-primary-700">Varicose Monitor</h1>
                    <p className="text-xs text-slate-500 mt-1">Healthcare Dashboard</p>
                </div>

                {/* User Profile */}
                <div className="p-4 border-b border-slate-200">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-primary-50 to-sky-50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white font-bold text-sm">
                            {currentUser?.fullname?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{currentUser?.fullname || 'User'}</p>
                            <p className="text-xs text-slate-500 capitalize">{currentUser?.role || ''}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.href;
                        return (
                            <a
                                key={i}
                                href={item.href}
                                onClick={() => setActiveNav(item.href)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                                    ? 'bg-primary-700 text-white shadow-lg shadow-primary-200'
                                    : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                <Icon className="text-xl" />
                                <span className="text-sm">{item.name}</span>
                            </a>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-slate-200">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-700 hover:bg-red-50 transition-all"
                    >
                        <BiLogOut className="text-xl" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header with Controls & Data Cards */}
                <div className="bg-white border-b border-slate-200 shadow-sm p-4 space-y-4">
                    {/* Toggle Switches */}
                    <div className="flex flex-wrap items-center justify-center gap-4 py-2 md:py-5">
                        <div className="flex items-center flex-col gap-2">
                            <ToggleSwitch
                                data={compressorStatus}
                                setData={setCompressorStatus}
                                id="compressor"
                                toggleSwitches={toggleSwitches}
                                disabled={switchesDisabled}
                            />
                            <span className="italic font-semibold text-slate-700">Compressor</span>
                        </div>
                        <div className="flex items-center flex-col gap-2">
                            <ToggleSwitch
                                data={heaterStatus}
                                setData={setHeaterStatus}
                                id="heater"
                                toggleSwitches={toggleSwitches}
                                disabled={switchesDisabled}
                            />
                            <span className="italic font-semibold text-slate-700">Heater</span>
                        </div>
                        <div className="flex items-center flex-col gap-2">
                            <ToggleSwitch
                                data={vibratorStatus}
                                setData={setVibratorStatus}
                                id="vibrator"
                                toggleSwitches={toggleSwitches}
                                disabled={switchesDisabled}
                            />
                            <span className="italic font-semibold text-slate-700">Vibrator</span>
                        </div>
                        {switchesDisabled && (
                            <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 border border-amber-200">
                                <span className="flex h-2 w-2">
                                    <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                                </span>
                                Wait {countdown}s
                            </div>
                        )}
                    </div>

                    {/* Data Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {Object.entries(recentData).map(([key, item]) => {
                            const Icon = item.icon;
                            return (
                                <div key={key} className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 p-4 shadow-md ring-1 ring-slate-100 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                                            <Icon className="text-xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{item.label}</p>
                                        <p className="text-2xl font-bold text-slate-900 mt-1">
                                            {item.value || '—'}
                                            <span className="text-sm font-normal text-slate-500 ml-1">{item.unit}</span>
                                        </p>
                                    </div>
                                    <div className="absolute -right-2 -bottom-2 h-16 w-16 rounded-full bg-primary-50 opacity-30"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-50 via-white to-primary-50">
                    {children}
                </div>
            </main>

            {/* Bottom Navigation - Mobile */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl z-50">
                <div className="grid grid-cols-4 gap-1 p-2">
                    {navItems.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.href;
                        return (
                            <a
                                key={i}
                                href={item.href}
                                onClick={() => setActiveNav(item.href)}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${isActive
                                    ? 'bg-primary-700 text-white'
                                    : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <Icon className="text-xl" />
                                <span className="text-[10px] font-medium">{item.name.split(' ')[0]}</span>
                            </a>
                        );
                    })}
                    <button
                        onClick={handleLogout}
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                    >
                        <BiLogOut className="text-xl" />
                        <span className="text-[10px] font-medium">Logout</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Layout