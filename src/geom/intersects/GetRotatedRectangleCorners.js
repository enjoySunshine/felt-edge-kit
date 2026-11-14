/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2026 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

var Vector2 = require('../../math/Vector2');

/**
 * Returns the four corners of a rotated rectangle.
 *
 * The rectangle is described by its center, size and rotation in radians.
 * Positive rotation turns the rectangle clockwise, matching the rotation of
 * Game Objects.
 *
 * The corners are returned in the order top-right, bottom-right, bottom-left,
 * top-left, based on the unrotated rectangle. This order is preserved as the
 * rectangle rotates.
 *
 * @function Phaser.Geom.Intersects.GetRotatedRectangleCorners
 * @since 4.3.0
 *
 * @param {Phaser.Types.Geom.RotatedRectangle} rect - The rotated rectangle to get the corners of.
 * @param {Phaser.Math.Vector2[]} [out] - An optional array in which to store the corners. If not given, a new array is created. Existing entries are reused.
 *
 * @return {Phaser.Math.Vector2[]} An array holding the four corners of the rotated rectangle.
 */
var GetRotatedRectangleCorners = function (rect, out)
{
    if (out === undefined) { out = []; }

    var halfWidth = rect.width / 2;
    var halfHeight = rect.height / 2;

    var cos = Math.cos(rect.rotation);
    var sin = Math.sin(rect.rotation);

    for (var i = 0; i < 4; i++)
    {
        //  Top-right, bottom-right, bottom-left, top-left of the unrotated rectangle
        var cornerX = (i === 0 || i === 1) ? halfWidth : -halfWidth;
        var cornerY = (i === 1 || i === 2) ? halfHeight : -halfHeight;

        var x = rect.x + cornerX * cos - cornerY * sin;
        var y = rect.y + cornerX * sin + cornerY * cos;

        if (out[i] === undefined)
        {
            out[i] = new Vector2(x, y);
        }
        else
        {
            out[i].set(x, y);
        }
    }

    return out;
};

module.exports = GetRotatedRectangleCorners;
