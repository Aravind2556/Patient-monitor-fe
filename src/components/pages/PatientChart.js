import React, { useContext } from 'react'
import LiveChart from '../blocks/LiveChart'
import { DContext } from '../../context/Datacontext'


export const PatientChart = () => {
    const { fieldOne, fieldTwo, fieldThree, fieldFour, controls } = useContext(DContext)


    if (!fieldOne || !fieldTwo || !fieldThree || !fieldFour ) {
        return <div>Loading...</div>
    }
  return (
    //   <div className="w-full flex flex-wrap justify-center gap-4 mt-6">
    //       {[fieldOne, fieldTwo, fieldThree, fieldFour, fieldFive].map((chartData, i) => (
    //           <div
    //               className="border rounded-xl shadow-md bg-white w-full md:w-[45%] p-3"
    //               key={i}
    //           >
    //               <LiveChart
    //                   data={[chartData]}
    //                   color={chartData.color}
    //                   title={chartData.seriesName}
    //                   lineStyle="straight"
    //                   lineWidth={2}
    //                   chartType="line"
    //                   controls={controls}
    //               />
    //           </div>
    //       ))}
    //        </div>

 <div className='px-10'>
          <div className="border rounded-xl shadow-md bg-white w-full p-4 mt-6">
              <LiveChart
                  data={[
                      fieldOne,
                      fieldTwo,
                      fieldThree,
                      fieldFour,
                  ]}
                  lineStyle="straight"
                  lineWidth={2}
                  chartType="line"
                  controls={controls}
              />
          </div>
 </div>
  )
}
