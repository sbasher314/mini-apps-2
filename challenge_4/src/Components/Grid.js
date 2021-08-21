import './Grid.css';
import { useSelector, useDispatch } from 'react-redux';

const Grid = () => {
  const visible = useSelector(state => state.mineField.grid);
  const dispatch = useDispatch();

  const handleMouse = (e, row, column) => {
    e.preventDefault();
    let type = e.button ? 'flag' : 'click';
    console.log(type, row, column);
    let payload = {row, column};
    dispatch({type, payload});
  }

  return (
    <div className="Grid" onContextMenu={e => e.preventDefault()}>
      {visible.map((row, r) =>
        (
          <div key = {'row-'+r} className="Row">
            {row.map((col, c) =>
            (
              <div key = {r + '' + c} className="Col" onMouseDown={(e) => handleMouse(e, r, c)}>
                <span className={'visible-'+visible[r][c]}>{visible[r][c]}</span>
              </div>
              )
            )}
        </div>)
      )}
    </div>
  );
}

export default Grid;
