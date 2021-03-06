﻿interface TagsScope extends ng.IRootScopeService {
    filter: FilterModel;
    openFilter: any;
    removeTag: any;
    clearAllTags: any;
}

describe('Filter tags component tests', () => {

    var $compile: ng.ICompileService,
        $scope: TagsScope,
        element: any,
        $document;

    beforeEach(() => {
        angular.mock.module('dd.ui.filter-tags');
        angular.mock.module('template/filter-tags/filter-tags.html');
    });

    beforeEach(inject((_$compile_, _$rootScope_, _$document_) => {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $document = _$document_;
    }));

    afterEach(() => {
        $document.find('#tags-container').remove();
    });

    describe('Init', () => {
        it('should create empty tags', () => {
            initComponent('<filter-tags filter="filter"></filter-tags>');

            expect(element.find('.btn-tag').length).toBe(0);
        });

        it('should create tags from filter', () => {
            $scope.filter = {
                'firstName': { displayName: 'First name', value: 'a' },
                'lastName': { value: 'm' },
                'isActive': { value: false }
            };

            initComponent('<filter-tags filter="filter"></filter-tags>');

            var tags = element.find('.btn-tag');
            expect(tags.length).toBe(3);
            expect(tags[0].innerHTML).toBe('First name: a');
            expect(tags[1].innerHTML).toBe('Last name: m');
            expect(tags[2].innerHTML).toBe('Is active: false');
        });

        it('should create tags using formatter', () => {
            $scope.filter = {
                'company': { displayName: 'Company', value: { id: 5, name: 'Vilnius' }, valueFormatter: (value) => value.name },
            };

            initComponent('<filter-tags filter="filter"></filter-tags>');

            var tags = element.find('.btn-tag');
            expect(tags.length).toBe(1);
            expect(tags[0].innerHTML).toBe('Company: Vilnius');
        });

        it('should not create tag for filter with default value', () => {
            $scope.filter = {
                'radius': { displayName: 'Radius', value: '100m', defaultValue: '100m' }
            };

            initComponent('<filter-tags filter="filter"></filter-tags>');

            var tags = element.find('.btn-tag');
            console.log(tags);
            
            expect(tags.length).toBe(0);
        });

        it('should not create tags for empty filters', () => {
            $scope.filter = {
                'firstName': { displayName: 'First name', value: undefined },
                'lastName': { value: undefined },
                'empty': { value: '' },
                'arr': { value: [] }
            };

            initComponent('<filter-tags filter="filter"></filter-tags>');

            var tags = element.find('.btn-tag');
            expect(tags.length).toBe(0);
        });
    });

    describe('Events', () => {
        it('should call onSelect event on tag click', () => {
            $scope.filter = {
                'firstName': { value: 'name' }
            };
            $scope.openFilter = jasmine.createSpy('openFilter');

            initComponent('<filter-tags on-select="openFilter(tag)" filter="filter"></filter-tags>');
            element.find('.btn-tag').click();

            expect($scope['openFilter']).toHaveBeenCalled();
        });

        it('should call onRemove event on tag remove click', () => {
            $scope.filter = {
                'firstName': { value: 'name' }
            };
            $scope.removeTag = jasmine.createSpy('removeTag');

            initComponent('<filter-tags on-remove="removeTag(tag)" filter="filter"></filter-tags>');
            element.find('.btn-tag-remove').click();

            expect($scope['removeTag']).toHaveBeenCalled();
        });

        it('should call onRemoveAll event on tags remove btn click', () => {
            $scope.filter = {
                'firstName': { value: 'name' }
            };
            $scope.clearAllTags = jasmine.createSpy('clearAllTags');

            initComponent('<filter-tags on-remove-all="clearAllTags()" filter="filter"></filter-tags>');
            element.find('.btn-clear-tags').click();

            expect($scope['clearAllTags']).toHaveBeenCalled();
        });
    });

    function initComponent(html: string) {
        element = $compile(`<div id="tags-container">${html}</div>`)($scope);
        element.appendTo($document[0]['body']);
        $scope.$digest();
    }
});