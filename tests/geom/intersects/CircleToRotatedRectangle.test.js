var CircleToRotatedRectangle = require('../../../src/geom/intersects/CircleToRotatedRectangle');

describe('Phaser.Geom.Intersects.CircleToRotatedRectangle', function ()
{
    //  Card: center (100, 100), 40 x 20
    var card = { x: 100, y: 100, width: 40, height: 20, rotation: 0 };

    beforeEach(function ()
    {
        card = { x: 100, y: 100, width: 40, height: 20, rotation: 0 };
    });

    it('should return true for a circle overlapping the right edge of an unrotated rectangle', function ()
    {
        expect(CircleToRotatedRectangle({ x: 125, y: 100, radius: 10 }, card)).toBe(true);
    });

    it('should return false for a circle clear of the right edge of an unrotated rectangle', function ()
    {
        expect(CircleToRotatedRectangle({ x: 140, y: 100, radius: 10 }, card)).toBe(false);
    });

    it('should return true for a circle touching the edge of an unrotated rectangle', function ()
    {
        expect(CircleToRotatedRectangle({ x: 130, y: 100, radius: 10 }, card)).toBe(true);
    });

    it('should return true for a circle overlapping the bottom edge of a rectangle rotated 90 degrees', function ()
    {
        card.rotation = Math.PI / 2;

        expect(CircleToRotatedRectangle({ x: 100, y: 130, radius: 15 }, card)).toBe(true);
    });

    it('should return false for a circle clear of a rectangle rotated 90 degrees', function ()
    {
        card.rotation = Math.PI / 2;

        expect(CircleToRotatedRectangle({ x: 100, y: 140, radius: 15 }, card)).toBe(false);
    });

    it('should return true for a circle overlapping an edge of a rectangle rotated 45 degrees', function ()
    {
        var rotated = { x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 4 };

        expect(CircleToRotatedRectangle({ x: 22, y: 8, radius: 6 }, rotated)).toBe(true);
    });

    it('should return true for a circle whose center is inside a rectangle rotated 45 degrees', function ()
    {
        var rotated = { x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 4 };

        expect(CircleToRotatedRectangle({ x: 2, y: 1, radius: 4 }, rotated)).toBe(true);
    });

    it('should return true for a circle overlapping a corner of a rectangle rotated 30 degrees', function ()
    {
        var rotated = { x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 6 };

        expect(CircleToRotatedRectangle({ x: 13.785, y: 24.124, radius: 8 }, rotated)).toBe(true);
    });

    it('should return false for a circle far away from a rotated rectangle', function ()
    {
        var rotated = { x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 6 };

        expect(CircleToRotatedRectangle({ x: 100, y: 100, radius: 10 }, rotated)).toBe(false);
    });

    it('should return false for a circle just missing the corner of a rotated rectangle', function ()
    {
        //  Corner of the unrotated card at (120, 90); circle center is more than radius away from it
        expect(CircleToRotatedRectangle({ x: 128.5, y: 82.5, radius: 10 }, card)).toBe(false);
    });

    it('should return true for a circle just reaching the corner of a rotated rectangle', function ()
    {
        //  Corner of the unrotated card at (120, 90); distance from (126, 84) to the corner is 8.49 < 10
        expect(CircleToRotatedRectangle({ x: 126, y: 84, radius: 10 }, card)).toBe(true);
    });

    it('should treat a full turn the same as no rotation', function ()
    {
        card.rotation = Math.PI * 2;

        expect(CircleToRotatedRectangle({ x: 125, y: 100, radius: 10 }, card)).toBe(true);
        expect(CircleToRotatedRectangle({ x: 140, y: 100, radius: 10 }, card)).toBe(false);
    });

    it('should return a boolean value', function ()
    {
        expect(typeof CircleToRotatedRectangle({ x: 125, y: 100, radius: 10 }, card)).toBe('boolean');
    });
});
