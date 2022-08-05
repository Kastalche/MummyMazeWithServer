using System.Collections;
using System.Collections.Generic;

public class Tile
{
    public int x { get; private set; }
    public int y { get; private set; }
    public List<int> obstacles = new List<int>(0);

    public Tile(int x, int y)
    {
        this.x = x;
        this.y = y;
    }
}
