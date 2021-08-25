import './Grid.css';
import { useSelector, useDispatch } from 'react-redux';

const Grid = () => {
  const visible = useSelector(state => state.mineField.visible);
  const hasFailed = useSelector(state => state.mineField.hasFailed);
  const dispatch = useDispatch();

  const handleMouse = (e, row, column) => {
    e.preventDefault();
    let type = e.button ? 'flag' : 'click';
    let payload = {row, column};
    dispatch({type, payload});
  }

  const restart = (e) => {
    e.preventDefault();
    dispatch({type: 'reset'});
  }

  return (
    <div className={'Grid' + (hasFailed ? ' disabled' : '')} onContextMenu={e => e.preventDefault()}>
      <div className="Row top">
        <button onClick={restart}>reset</button>
      </div>
      {visible.map((row, r) =>
        (
          <div key = {'row-'+r} className="Row">
            {row.map((col, c) =>
            (
              <div key = {r + '' + c} className={'Col visible-'+visible[r][c]} onMouseDown={(e) => handleMouse(e, r, c)}>
                <span></span>
              </div>
              )
            )}
        </div>)
      )}
    </div>
  );
}

export default Grid;
