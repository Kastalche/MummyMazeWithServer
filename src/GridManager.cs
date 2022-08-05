using System.Collections;
using System.Collections.Generic;

public class GridManager : MonoBehaviour
{
    public Tile[,] tiles { get; private set; }
    private int width = 6;
    private int height = 6;

    void GenerateGrid()
    {
        tiles = new Tile[width, height];

        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                spawnedTile = new Tile(x, y);
                tiles[x, y].Add(spawnedTile);
            }
        }
        GenerateObstacles();
    }

    void AddObstacles(int x, int y, int obstacle)
    {
        tiles[x, y].obstacles.Add(obstacle);
    }

    void GenerateObstacles()
    {
        AddObstacles(1, 5, 4);
        AddObstacles(1, 4, 2);
        AddObstacles(1, 4, 4);
        AddObstacles(1, 3, 2);
        AddObstacles(1, 3, 3);

        AddObstacles(2, 3, 1);

        AddObstacles(3, 4, 3);
        AddObstacles(3, 3, 3);
        AddObstacles(3, 3, 4);
        AddObstacles(3, 2, 2);

        AddObstacles(4, 4, 1);
        AddObstacles(4, 3, 1);
        AddObstacles(4, 2, 3);

        AddObstacles(5, 4, 4);
        AddObstacles(5, 3, 2);
        AddObstacles(5, 2, 1);
    }
}
