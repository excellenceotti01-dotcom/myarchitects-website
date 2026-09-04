import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { readWorkReturnContext, saveWorkReturnContext } from "../../utils/workReturnContext";
import styles from "./ProjectBackControl.module.css";

const ProjectBackControl = ({ projectId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const contextRef = useRef(readWorkReturnContext(projectId)?.context ?? location.state?.returnContext ?? null);
  useEffect(() => { const preserve = () => contextRef.current && saveWorkReturnContext(contextRef.current, true); window.addEventListener("popstate", preserve); return () => window.removeEventListener("popstate", preserve); }, []);
  const returnToWork = () => { const context = contextRef.current; if (context) saveWorkReturnContext(context, true); navigate("/work", { replace: true, state: context ? { workReturnContext: context } : undefined }); };
  return <button type="button" className={styles.back} onClick={returnToWork}><span aria-hidden="true">←</span> Back to projects</button>;
};
export default ProjectBackControl;
