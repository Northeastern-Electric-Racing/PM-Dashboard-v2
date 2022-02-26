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
import { useContext } from 'react';

interface DependenciesListProps {
  dependencies: WbsNumber[];
}

const DependenciesList: React.FC<DependenciesListProps> = ({ dependencies }) => {
  const { editMode, setField } = useContext(FormContext);
  const AddButton = (
    <InputGroup>
      <Form.Control type="text" placeholder="New WBS #" onChange={(e) => setField("dependency",e.target.value)}></Form.Control>
      <Button variant="success">+</Button>
    </InputGroup>
  );
  const items = dependencies.map((ele) => <Dependency wbsNumber={ele} />);

  return (
    <HorizontalList
      title={'Dependencies'}
      headerRight={<></>}
      items={editMode ? [...items, AddButton] : items}
    />
  );
};

export default DependenciesList;
