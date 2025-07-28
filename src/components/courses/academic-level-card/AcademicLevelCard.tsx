import { Trash } from "lucide-react"
import { AcademicLevel } from "../../../models/course/AcademicLevel"
import "./academic-level-card.css"

interface Props {
  level: AcademicLevel
}

export const AcademicLevelCard = ({level}: Props) => {
  return (
    <div className="academic-level-card-component flex-row-between">
      <button className="academic-level-name-section complete-left">
        <b>{level.name}</b>
      </button>
      <div className="academic-level-card-actions-section">
        {/* <button className="academic-level-card-actions academic-level-card-action-delete flex-column-center"><Trash /></button> */}
      </div>
    </div>
  )
}