import React from 'react'
import TaskCss from './Task.module.css'
const Task = ({complete,remaining,totalTask}) => {
  return (
    <div>
        <section className={TaskCss.task_container}>
            <div className={TaskCss.task_heading}><p>
                Completed Task:- {complete}
            </p>
            </div>
            <div className={TaskCss.task_complete}>{remaining}/{totalTask}</div>
        </section>
    </div>
  )
}

export default Task