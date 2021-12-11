import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailedTask = () => {
 const { id } = useParams();

 const { tasks: { tasks } } = useSelector((state) => state);
 const { description } = tasks.find((t) => t.id === id);

 return (
  <div className="d-flex flex-column h-100 mt-3">
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6 mb-4">
        <h3>Подробное описание: </h3>
        <h4>{description}</h4>
        <Link to='/'>Назад</Link>
      </div>
    </div>
  </div>
</div>
 );
}

export default DetailedTask;
