'use strict';

describe('CookeryBook', function() {
  let React = require('react');
  let {Map, List, fromJS} = require('immutable');
  let TestUtils = require('react-shallow-testutils');
  let renderer = new TestUtils.Renderer();
  let rewire = require('rewire');
  var CookeryBook, BookCover, Page, Recipe, BrowseButton;

  beforeAll(function() {
    this.mockActions = {
      setFirstPage: jasmine.createSpy(), setLastPage: jasmine.createSpy(),
      setPreviousPage: jasmine.createSpy(), setNextPage: jasmine.createSpy()
    };

    CookeryBook = rewire('components/CookeryBook.js');
    CookeryBook.__set__('CookeryBookActions', this.mockActions);

    BookCover = require('components/BookCover');
    Page = require('components/Page');
    Recipe = require('components/Recipe');
    BrowseButton = require('components/BrowseButton');
  });

  beforeEach(function() {
    this.mockActions.setFirstPage.calls.reset();
    this.mockActions.setPreviousPage.calls.reset();
    this.mockActions.setNextPage.calls.reset();
    this.mockActions.setLastPage.calls.reset();

    this.recipes = fromJS([
      {id: 'r1', title: 'recipe1'}, {id: 'r2',  title: 'recipe2'},
      {id: 'r3',  title: 'recipe3'}, {id: 'r4',  title: 'recipe4'}
    ]);
    this.book = Map({actualRecipe: 'r2'});
    let props = {book: this.book, recipes: this.recipes};

    this.component = renderer.render(() => <CookeryBook {...props} />, props);
  });

  it('should set book cover as a actual when recipe id is not defined', function() {
    let props = {book: Map({actualRecipe: null}), recipes: this.recipes};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    let cover = TestUtils.findWithType(component, BookCover);
    expect(cover.props.actual).toEqual(true);
  });

  it('should not set book cover as a actual when recipe id is not defined', function() {
    let cover = TestUtils.findWithType(this.component, BookCover);
    expect(cover.props.actual).toEqual(false);
  });

  it('should create just forward buttons when recipe id is not defined', function() {
    let props = {book: Map({actualRecipe: null}), recipes: this.recipes};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    let browseButtons = TestUtils.findAllWithType(component, BrowseButton);
    expect(browseButtons.length).toEqual(2);
    expect(browseButtons[0].props.type).toEqual('forward');
    expect(browseButtons[1].props.type).toEqual('fast-forward');
  });

  it('should create both browse buttons when show recipe in middle of book', function() {
    let browseButtons = TestUtils.findAllWithType(this.component, BrowseButton);
    expect(browseButtons.length).toEqual(4);
    expect(browseButtons[0].props.type).toEqual('backward');
    expect(browseButtons[1].props.type).toEqual('fast-backward');
    expect(browseButtons[2].props.type).toEqual('forward');
    expect(browseButtons[3].props.type).toEqual('fast-forward');
  });

  it('should create no button when there are no recipes', function() {
    let props = {book: Map({actualRecipe: null}), recipes: List([])};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    let browseButtons = TestUtils.findAllWithType(component, BrowseButton);
    expect(browseButtons.length).toEqual(0);
  });

  it('should create just backward buttons when recipe id is id of last', function() {
    let props = {book: Map({actualRecipe: 'r4'}), recipes: this.recipes};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    let browseButtons = TestUtils.findAllWithType(component, BrowseButton);
    expect(browseButtons.length).toEqual(2);
    expect(browseButtons[0].props.type).toEqual('backward');
    expect(browseButtons[1].props.type).toEqual('fast-backward');
  });

  it('should call appropriete action when clicked button', function() {
    let browseButtons = TestUtils.findAllWithType(this.component, BrowseButton);

    browseButtons[0].props.onClick();
    expect(this.mockActions.setPreviousPage.calls.count(), 'backward').toEqual(1);

    browseButtons[1].props.onClick();
    expect(this.mockActions.setFirstPage.calls.count(), 'fast-backward').toEqual(1);

    browseButtons[2].props.onClick();
    expect(this.mockActions.setNextPage.calls.count(), 'forward').toEqual(1);

    browseButtons[3].props.onClick();
    expect(this.mockActions.setLastPage.calls.count(), 'fast-forward').toEqual(1);
  });

  it('should create page for each recipe', function() {
    let pages = TestUtils.findAllWithType(this.component, Page);
    expect(pages.length).toEqual(this.recipes.size);
  });
  
  it('should set class `hidden` for each other than actual recipe', function() {
    let props = {book: this.book, recipes: this.recipes, height: 500};

    let component = renderer.render(() => <CookeryBook {...props} />, props);
    let pages = TestUtils.findAllWithType(component, Page);

    expect(pages[0].key).toEqual(this.recipes.getIn([0, 'id']));
    expect(pages[0].props.type, 'page 1').toEqual('hidden');
    expect(pages[1].key).toEqual(this.recipes.getIn([1, 'id']));
    expect(pages[1].props.type, 'page 2').toEqual('');
    expect(pages[2].key).toEqual(this.recipes.getIn([2, 'id']));
    expect(pages[2].props.type, 'page 3').toEqual('hidden');
    expect(pages[3].key).toEqual(this.recipes.getIn([3, 'id']));
    expect(pages[3].props.type, 'page 4').toEqual('hidden');
  });
});
