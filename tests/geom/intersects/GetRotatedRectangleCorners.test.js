var GetRotatedRectangleCorners = require('../../../src/geom/intersects/GetRotatedRectangleCorners');
var Vector2 = require('../../../src/math/Vector2');

describe('Phaser.Geom.Intersects.GetRotatedRectangleCorners', function ()
{
    //  Card: center (100, 100), 40 x 20
    var card = { x: 100, y: 100, width: 40, height: 20 };

    function expectCornersClose (corners, expected, tolerance)
    {
        expect(corners.length).toBe(4);

        for (var i = 0; i < 4; i++)
        {
            expect(Math.abs(corners[i].x - expected[i][0])).toBeLessThanOrEqual(tolerance);
            expect(Math.abs(corners[i].y - expected[i][1])).toBeLessThanOrEqual(tolerance);
        }
    }

    it('should return the corners of an unrotated rectangle in TR, BR, BL, TL order', function ()
    {
        var corners = GetRotatedRectangleCorners({ x: card.x, y: card.y, width: card.width, height: card.height, rotation: 0 });

        expectCornersClose(corners, [
            [ 120, 90 ],
            [ 120, 110 ],
            [ 80, 110 ],
            [ 80, 90 ]
        ], 0.001);
    });

    it('should rotate the corners 90 degrees clockwise around the center', function ()
    {
        var corners = GetRotatedRectangleCorners({ x: card.x, y: card.y, width: card.width, height: card.height, rotation: Math.PI / 2 });

        expectCornersClose(corners, [
            [ 110, 120 ],
            [ 90, 120 ],
            [ 90, 80 ],
            [ 110, 80 ]
        ], 0.001);
    });

    it('should rotate the corners 45 degrees clockwise around a center at the origin', function ()
    {
        var corners = GetRotatedRectangleCorners({ x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 4 });

        expectCornersClose(corners, [
            [ 21.213, 7.071 ],
            [ 7.071, 21.213 ],
            [ -21.213, -7.071 ],
            [ -7.071, -21.213 ]
        ], 0.001);
    });

    it('should rotate the corners 30 degrees clockwise around a center at the origin', function ()
    {
        var corners = GetRotatedRectangleCorners({ x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 6 });

        expectCornersClose(corners, [
            [ 22.321, 1.340 ],
            [ 12.321, 18.660 ],
            [ -22.321, -1.340 ],
            [ -12.321, -18.660 ]
        ], 0.001);
    });

    it('should return Vector2 instances', function ()
    {
        var corners = GetRotatedRectangleCorners({ x: 0, y: 0, width: 10, height: 10, rotation: 0 });

        expect(corners[0]).toBeInstanceOf(Vector2);
    });

    it('should reuse the entries of a given out array', function ()
    {
        var out = [ new Vector2(), new Vector2(), new Vector2(), new Vector2() ];

        var corners = GetRotatedRectangleCorners({ x: 100, y: 100, width: 40, height: 20, rotation: 0 }, out);

        expect(corners).toBe(out);
        expect(corners[0].x).toBe(120);
        expect(corners[0].y).toBe(90);
    });
});
