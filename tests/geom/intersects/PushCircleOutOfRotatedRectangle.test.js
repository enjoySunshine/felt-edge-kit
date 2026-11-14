var PushCircleOutOfRotatedRectangle = require('../../../src/geom/intersects/PushCircleOutOfRotatedRectangle');

describe('Phaser.Geom.Intersects.PushCircleOutOfRotatedRectangle', function ()
{
    //  Distance from a point to a rotated rectangle (0 when the point is inside it)
    function distanceToRect (x, y, rect)
    {
        var cos = Math.cos(rect.rotation);
        var sin = Math.sin(rect.rotation);

        var dx = x - rect.x;
        var dy = y - rect.y;

        var localX = dx * cos + dy * sin;
        var localY = dy * cos - dx * sin;

        var closestX = Math.max(-rect.width / 2, Math.min(rect.width / 2, localX));
        var closestY = Math.max(-rect.height / 2, Math.min(rect.height / 2, localY));

        var distX = localX - closestX;
        var distY = localY - closestY;

        return Math.sqrt(distX * distX + distY * distY);
    }

    function expectClose (actual, expected)
    {
        //  All pushed positions must match the reference values within 0.002
        expect(Math.abs(actual.x - expected[0])).toBeLessThanOrEqual(0.002);
        expect(Math.abs(actual.y - expected[1])).toBeLessThanOrEqual(0.002);
    }

    function expectClearOfRect (circle, rect)
    {
        //  After the push the circle may touch the card, but never overlap it
        expect(distanceToRect(circle.x, circle.y, rect)).toBeGreaterThanOrEqual(circle.radius - 1e-6);
    }

    describe('card at (100, 100), 40 x 20, unrotated', function ()
    {
        var card = { x: 100, y: 100, width: 40, height: 20, rotation: 0 };

        it('should push a circle on the right edge out to (130, 100)', function ()
        {
            var circle = { x: 125, y: 100, radius: 10 };

            PushCircleOutOfRotatedRectangle(circle, card);

            expectClose(circle, [ 130, 100 ]);
            expectClearOfRect(circle, card);
        });

        it('should leave a circle that misses the card where it is', function ()
        {
            var circle = { x: 140, y: 100, radius: 10 };

            var result = PushCircleOutOfRotatedRectangle(circle, card);

            expect(circle.x).toBe(140);
            expect(circle.y).toBe(100);
            expect(result).toBe(circle);
        });
    });

    describe('card at (100, 100), 40 x 20, rotated 90 degrees', function ()
    {
        var card = { x: 100, y: 100, width: 40, height: 20, rotation: Math.PI / 2 };

        it('should push a circle on the bottom edge out to (100, 135)', function ()
        {
            var circle = { x: 100, y: 130, radius: 15 };

            PushCircleOutOfRotatedRectangle(circle, card);

            expectClose(circle, [ 100, 135 ]);
            expectClearOfRect(circle, card);
        });
    });

    describe('card at (0, 0), 40 x 20, rotated 45 degrees', function ()
    {
        var card = { x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 4 };

        it('should push a circle on an edge out to (25.385, 11.385)', function ()
        {
            var circle = { x: 22, y: 8, radius: 6 };

            PushCircleOutOfRotatedRectangle(circle, card);

            expectClose(circle, [ 25.385, 11.385 ]);
            expectClearOfRect(circle, card);
        });

        it('should push a circle from inside the card out to (11.399, -8.399)', function ()
        {
            var circle = { x: 2, y: 1, radius: 4 };

            PushCircleOutOfRotatedRectangle(circle, card);

            expectClose(circle, [ 11.399, -8.399 ]);
            expectClearOfRect(circle, card);
        });

        it('should push a circle sitting on the card center clear of the card', function ()
        {
            var circle = { x: 0, y: 0, radius: 4 };

            PushCircleOutOfRotatedRectangle(circle, card);

            expectClearOfRect(circle, card);
        });
    });

    describe('card at (0, 0), 40 x 20, rotated 30 degrees', function ()
    {
        var card = { x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 6 };

        it('should push a circle on a corner out to (14.392, 26.387)', function ()
        {
            var circle = { x: 13.785, y: 24.124, radius: 8 };

            PushCircleOutOfRotatedRectangle(circle, card);

            expectClose(circle, [ 14.392, 26.387 ]);
            expectClearOfRect(circle, card);
        });
    });

    it('should not move the card when pushing the circle', function ()
    {
        var card = { x: 100, y: 100, width: 40, height: 20, rotation: Math.PI / 4 };
        var circle = { x: 125, y: 100, radius: 10 };

        PushCircleOutOfRotatedRectangle(circle, card);

        expect(card).toEqual({ x: 100, y: 100, width: 40, height: 20, rotation: Math.PI / 4 });
    });

    it('should push a circle covering the whole card clear of it', function ()
    {
        var card = { x: 0, y: 0, width: 40, height: 20, rotation: Math.PI / 3 };
        var circle = { x: 1, y: -2, radius: 50 };

        PushCircleOutOfRotatedRectangle(circle, card);

        expectClearOfRect(circle, card);
    });
});
