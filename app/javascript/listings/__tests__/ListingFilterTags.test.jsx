import { h } from 'preact';
import { deep } from 'preact-render-spy';
import ListingFiltersTags from '../components/ListingFiltersTags';

describe('<ListingFilterTags />', () => {
  const getTags = () => ['clojure', 'java', 'dotnet'];

  const getProps = () => ({
    message: 'Some message',
    onKeyUp: () => {
      return 'onKeyUp';
    },
    onClearQuery: () => {
      return 'onClearQuery';
    },
    onRemoveTag: () => {
      return 'onRemoveTag';
    },
    onKeyPress: () => {
      return 'onKeyPress';
    },
    query: 'some-string&this=1',
    tags: getTags(),
  });

  const renderListingFilterTags = (props = getProps()) =>
    deep(<ListingFiltersTags {...props} />);

  describe('Should render a search field', () => {
    const context = renderListingFilterTags();
    const searchField = context.find('#listings-search');

    it('Should have "search" as placeholder', () => {
      expect(searchField.attr('placeholder')).toBe('search');
    });

    it(`Should have "${getProps().message}" as default value`, () => {
      expect(searchField.attr('defaultValue')).toBe(getProps().message);
    });

    it('Should have auto-complete as off', () => {
      expect(searchField.attr('autoComplete')).toBe('off');
    });
  });

  describe('<ClearQueryButton />', () => {
    const context = renderListingFilterTags();

    it('Should render the clear query button', () => {
      expect(context.find('#clear-query-button').exists()).toBe(true);
    });

    it('Should not render the clear query button', () => {
      const propsWithoutQuery = { ...getProps(), query: '' };
      const contextWithAnotherProps = renderListingFilterTags(
        propsWithoutQuery,
      );

      expect(contextWithAnotherProps.find('#clearQueryButton').exists()).toBe(
        false,
      );
    });
  });

  it('Should render the selected Tags', () => {
    const context = renderListingFilterTags();
    getTags().forEach((tag) => {
      const selectedTag = context.find(`#selected-tag-${tag}`);

      expect(selectedTag.text()).toEqual(expect.stringContaining(tag));
      expect(selectedTag.text()).toEqual(expect.stringContaining('×'));
    });
  });
});
