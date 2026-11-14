/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2026 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Checks for intersection between a circle and a rotated rectangle.
 *
 * The rectangle is described by its center, size and rotation in radians.
 * Positive rotation turns the rectangle clockwise, matching the rotation of
 * Game Objects.
 *
 * A circle touching the rectangle is considered to be intersecting it.
 *
 * @function Phaser.Geom.Intersects.CircleToRotatedRectangle
 * @since 4.3.0
 *
 * @param {Phaser.Geom.Circle} circle - The circle to be checked.
 * @param {Phaser.Types.Geom.RotatedRectangle} rect - The rotated rectangle to be checked.
 *
 * @return {boolean} `true` if the two objects intersect, otherwise `false`.
 */
var CircleToRotatedRectangle = function (circle, rect)
{
    var halfWidth = rect.width / 2;
    var halfHeight = rect.height / 2;

    //  Rotate the circle center into the rectangle's local frame,
    //  where the rectangle is axis-aligned
    var cos = Math.cos(rect.rotation);
    var sin = Math.sin(rect.rotation);

    var dx = circle.x - rect.x;
    var dy = circle.y - rect.y;

    var localX = dx * cos + dy * sin;
    var localY = dy * cos - dx * sin;

    //  Closest point on the axis-aligned rectangle to the circle center
    var closestX = Math.max(-halfWidth, Math.min(halfWidth, localX));
    var closestY = Math.max(-halfHeight, Math.min(halfHeight, localY));

    var distX = localX - closestX;
    var distY = localY - closestY;

    return (distX * distX + distY * distY) <= circle.radius * circle.radius;
};

module.exports = CircleToRotatedRectangle;
