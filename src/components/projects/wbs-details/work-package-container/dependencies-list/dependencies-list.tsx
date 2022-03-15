/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */
import { WbsNumber } from 'utils';
import HorizontalList from '../../../../shared/horizontal-list/horizontal-list';
import Dependency from './dependency/dependency';
import './dependencies-list.module.css';
import { Button, InputGroup, Form } from 'react-bootstrap';
import { FormContext } from '../work-package-container';
import { useContext, useEffect, useState } from 'react';
import { validateWBS } from 'utils';

interface DependenciesListProps {
  dependencies: WbsNumber[];
}

const DependenciesList: React.FC<DependenciesListProps> = ({ dependencies }) => {
  const { editMode } = useContext(FormContext);
  const [dependenciesState, setDependenciesState] = useState(dependencies);
  const [unvalidatedDependency, setUnvalidatedDependency] = useState('');

  useEffect(() => {
    setDependenciesState(dependencies);
  }, [editMode, dependencies])
  
  const AddButton = (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="New WBS #"
        onChange={(e) => setUnvalidatedDependency(e.target.value)}
      ></Form.Control>
      <Button variant="success" onClick={handleAdd}>
        +
      </Button>
    </InputGroup>
  );

  function handleDelete(dependencyToDelete: WbsNumber) {
    const index = dependenciesState.indexOf(dependencyToDelete);
    if (index !== -1) {
      const half1 = dependenciesState.slice(0, index);
      const half2 = dependenciesState.slice(index + 1);
      setDependenciesState(half1.concat(half2));
    }
  }

  function handleAdd() {
    try {
      setDependenciesState([...dependenciesState, validateWBS(unvalidatedDependency)]);
    } catch (error: any) {
      alert(error.message);
    }
    setUnvalidatedDependency('');
  }

  const items = dependenciesState.map((e) => (
    <Dependency wbsNumber={e} handleDelete={handleDelete} />
  ));

  return (
    <HorizontalList
      title={'Dependencies'}
      headerRight={<></>}
      items={editMode ? [...items, AddButton] : items}
    />
  );
};

export default DependenciesList;
