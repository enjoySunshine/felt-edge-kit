/**
 * @author       Richard Davey <rich@phaser.io>
 * @copyright    2013-2026 Phaser Studio Inc.
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

/**
 * Pushes a circle out of a rotated rectangle.
 *
 * If the circle intersects the rectangle, the circle is moved along the
 * shortest direction that frees it, until its outline no longer overlaps the
 * rectangle. The rectangle itself never moves. After the push the circle
 * touches the rectangle, either along an edge or on a corner, without
 * overlapping it.
 *
 * If the circle does not intersect the rectangle, it is left unchanged.
 *
 * The rectangle is described by its center, size and rotation in radians.
 * Positive rotation turns the rectangle clockwise, matching the rotation of
 * Game Objects.
 *
 * @function Phaser.Geom.Intersects.PushCircleOutOfRotatedRectangle
 * @since 4.3.0
 *
 * @param {Phaser.Geom.Circle} circle - The circle to push out of the rectangle. Its position is modified in place.
 * @param {Phaser.Types.Geom.RotatedRectangle} rect - The rotated rectangle to push the circle out of.
 *
 * @return {Phaser.Geom.Circle} The circle that was passed in.
 */
var PushCircleOutOfRotatedRectangle = function (circle, rect)
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

    var pushX = 0;
    var pushY = 0;

    if (localX >= -halfWidth && localX <= halfWidth && localY >= -halfHeight && localY <= halfHeight)
    {
        //  The circle center is inside the rectangle.
        //  Push it out through the nearest edge, by the depth of the
        //  center plus the radius, so the circle clears the edge.
        var fromLeft = localX + halfWidth;
        var fromRight = halfWidth - localX;
        var fromTop = localY + halfHeight;
        var fromBottom = halfHeight - localY;

        var nearest = Math.min(fromLeft, fromRight, fromTop, fromBottom);

        if (nearest === fromRight)
        {
            pushX = fromRight + circle.radius;
        }
        else if (nearest === fromLeft)
        {
            pushX = -(fromLeft + circle.radius);
        }
        else if (nearest === fromBottom)
        {
            pushY = fromBottom + circle.radius;
        }
        else
        {
            pushY = -(fromTop + circle.radius);
        }
    }
    else
    {
        //  The circle center is outside the rectangle.
        //  Push it directly away from the closest point on the rectangle,
        //  which lies on an edge or on a corner.
        var closestX = Math.max(-halfWidth, Math.min(halfWidth, localX));
        var closestY = Math.max(-halfHeight, Math.min(halfHeight, localY));

        var distX = localX - closestX;
        var distY = localY - closestY;

        var distSquared = distX * distX + distY * distY;
        var radiusSquared = circle.radius * circle.radius;

        if (distSquared >= radiusSquared)
        {
            //  No overlap, nothing to do
            return circle;
        }

        var dist = Math.sqrt(distSquared);
        var push = (circle.radius - dist) / dist;

        pushX = distX * push;
        pushY = distY * push;
    }

    //  Rotate the push vector back into world space
    circle.x += pushX * cos - pushY * sin;
    circle.y += pushX * sin + pushY * cos;

    return circle;
};

module.exports = PushCircleOutOfRotatedRectangle;
