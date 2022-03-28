/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import { render, screen } from '../../../test-support/test-utils';
import EditableTextInputList from './editable-text-input-list';

const mockItems = ['tee hee', 'yahello', 'yeet', 'yoink'];

/**
 * Sets up the component under test with the desired values and renders it.
 */
const renderComponent = (items: any) => {
  return render(
    <EditableTextInputList items={items} add={() => null} remove={() => null} update={() => null} />
  );
};

describe('editable text input list test suite', () => {
  describe('multiple items', () => {
    it('render x buttons', () => {
      renderComponent(mockItems);

      expect(screen.getAllByRole('button', { name: 'X' })).toHaveLength(4);
    });

    it('render + add new bullet button', () => {
      renderComponent(mockItems);

      expect(screen.getByRole('button', { name: '+ Add New Bullet' })).toBeInTheDocument();
    });

    it('render content', async () => {
      renderComponent(mockItems);

      const res = (await screen.findAllByRole('textbox')) as HTMLInputElement[];
      res.forEach((item, index) => {
        expect(item.value).toEqual(mockItems[index]);
      });
      expect(screen.getAllByRole('textbox')).toHaveLength(4);
    });
  });

  describe('no items', () => {
    it('render x button', () => {
      renderComponent([]);

      expect(screen.queryByText('X')).not.toBeInTheDocument();
    });

    it('render + add new bullet button', () => {
      renderComponent([]);

      expect(screen.getByRole('button', { name: '+ Add New Bullet' })).toBeInTheDocument();
    });

    it('no text boxes rendered', async () => {
      renderComponent([]);

      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });
});
