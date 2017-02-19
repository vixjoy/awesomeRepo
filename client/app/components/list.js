
import Inferno from 'inferno';

function List({ state, actions }) {

  if(!state.files || !state.files.length)
    actions.files();

  if(!state.files)
    return (
      <div>Loading Your Files...</div>
    );
  if(!state.files.length)
    return (
      <div>
        <span>You have no files! Upload some!</span>
        <input type='file' onChange={actions.uploadFile} />
      </div>
    );

  state.files.forEach(({ _id }) => !state[_id] && actions.getFile(_id));

  return (
    <span>
    <div className='form-group' style={{width: '60%', marginLeft: '20%', marginTop: '20px'}}>
      <div className='form-group row'>
        <label>Upload</label>
        <input type='file' onChange={actions.uploadFile} />
      </div>
      {
        state.files.map(({ _id, path }) => (
          <div className='form-group row'>
            <a target='_blank' href={state[_id]}>{path}</a>
          </div>
        ))
      }
    </div>
    </span>
  );
}

export default List;
